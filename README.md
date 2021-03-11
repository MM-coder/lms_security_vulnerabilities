# NEO & MATRIX LMS Cross-site scripting attacks (plus timer mismatch bug)

## Introduction 

This repository serves as a directory of both the writeups and the proof-of-concept for the investigation in to XSS vulnerabilities in the aforementioned peices of software.

## Vulnerabities
### XSS

|    Component Tested   | Is XSS possible? |     Under what circumstances?    | Possibly affected user groups | CVSS Attributed |
|:---------------------:|:----------------:|:--------------------------------:|:-----------------------------:|:---------------:|
| Debate Assignments    | No               | N/A                              | N/A                           | N/A             |
| Essay Assignments     | No               | N/A                              | N/A                           | N/A             |
| Forum Assignments     | No               | N/A                              | N/A                           | N/A             |
| Survey Assignments    | Yes              | Freeform Questions               | Instructors                   | 5.4 (medium)    |
| Quiz Assigments       | Yes              | Arithmetic Questions             | Instructors                   | 5.4 (medium)    |
| Task Descriptions     | Yes              | All task descriptions            | Learners, Instructors         | 4.8 (medium)    |
| User Portfolio/Locker | Yes              | HTML files in a user's portfolio | Learners, Instructors         | 5.4 (medium)    |

### Timer

The timer on quiz assignments is client-side only, the server does not check the submission time, hence by disabling the timer client side we effectively disable the timer.

## Contents

* [`timer_bypass/matrix_neo_quiz_writeup.pdf`](/timer_bypass/matrix_neo_quiz_writeup.pdf) - Write up for the XSS vulnerabilities found in assigments, task descriptions and the user's portfolio
* [`timer_bypass/proof_of_concept/`](/timer_bypass/proof_of_concept) - Code for the proof-of-concept of the timer bypass, consitutes a Firefox addon which can be loaded as described [here](https://blog.mozilla.org/addons/2015/12/23/loading-temporary-add-ons/)
* [`xss_vulnerabilties/matrix_neo_xss_writeup.pdf`](/xss_vulnerabilities/matrix_neo_xss_writeup.pdf) - Write up for the XSS vulnerabilities found in assigments, task descriptions and the user's portfolio
* [`xss_vulnerabilties/proof_of_concept/`](/xss_vulnerabilities/proof_of_concept) - Payload that was created specifically to impede a instructor from correcting a student's submission.




## License 

![License Badge](https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc.svg)

The aforementioned code and documents are protected and released to the public under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License which can be viewed in license.md or on the Creative Commons website (https://creativecommons.org/licenses/by-nc/4.0/). Any failure to comply with the terms designated in the license will be met with swift judicial action by the author.

By downloading, executing or otherwise transferring the contents of this repository by any means you are legally bound to the terms stipulated in the license.
