function handleResponse(requestDetails) {
    
  let filter = browser.webRequest.filterResponseData(requestDetails.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.ondata = event => {

    // Decode the first block of data

    let str = decoder.decode(event.data, {stream: true});
    
    // Creating a dummy HTML element to simplify operations
    const dummy = document.createElement('html');
    dummy.innerHTML = str

    // Get all script elements

    let scripts = dummy.getElementsByTagName('script');

    for (let i = 0; i < scripts.length; i++) {
      if (!scripts[i].hasAttribute('src')) {
        if (scripts[i].textContent.includes('init_quiz')) { // Is it the script tag that initializes the quiz?

          // Not the most efficient way to go about doing this, but it works

          let text = scripts[i].textContent;

          // Create an array containing the arguments passed in to the init_quiz() function

          text = text.replace(/(init_quiz\({)/g, '') // Remove the first part of the func call
          text = text.replace(/(}\);)/g, '') // Remove the }), aka. the end of the func call
          text = text.replace(/\r?\n|\r/g, '') // Remove whitespace
          let args = text.split(/,(?=([^']+'[^']+')*[^']*$)/g) // Split using a regex rule

          // Filter the messy array the regex provides

          let uniqueArgs = args.filter((c, index) => {
            return args.indexOf(c) === index;
          });

          let filteredArgs = Array()
          

          // @NOTE(Mauro): Could probably use a filter here

          for (let index = 0; index < uniqueArgs.length; index++) {
            let arg = uniqueArgs[index]
            if (arg !== undefined) {
              if (!arg.startsWith(',')) {
                filteredArgs.push(arg)
              }
            }
          }

          // Iterate through every element of arguments

          let map = new Map();

          for (let index = 0; index < filteredArgs.length; index++) {

            // Using a substring, get the property name

            let str = filteredArgs[index]
            let key = str.substring(0, str.indexOf(':')).trim()
            let value = str.replace(key + ':', '').trim()

            // Logic case that checks and converts the different types

            if (value.match(/(\d+)/) != null) {
              value = Number(value)
            }
            else if (value === 'true' || value === 'false') {

              // Given that 'true' and 'false' are JSON representations of true and false
              // just JSON parse it

              value =  JSON.parse(value)
            }
            else {
              value = value.replace(/'/g, '')
            }

            map[key] = value // Add value to map

          }
          map['total_seconds'] = null
          text = `init_quiz(${JSON.stringify(map)})`
          scripts[i].textContent = text
        }
      }
      
    }
    filter.write(encoder.encode(dummy.innerHTML));
    filter.disconnect();
  }
  return {};
}
  
browser.webRequest.onBeforeRequest.addListener(
    handleResponse,
    {urls: ["https://*/student_take_quiz_assignment/display/*"], types: ["main_frame"]},
    ["blocking"]
);