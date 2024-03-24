# SWAT (Software Architecture and Techniques)

This document is a collection of exercise solutions for the course Software Architecture and Techniques (SWAT) in 
spring 2024.

## SW01 - Why Agile Architecture And Design?

### Exercise 2
The IDE I use is PHPStorm, an IDE for PHP, HTML, CSS, and JavaScript, as this project is written in JavaScript.

The tool analyzing the code is SonarLint. 

#### SonarLint refactoring
The first run of SonarLint on the project showed 1 issue in backend, which covered an unstaged file (.env).

The frontend, which is written in Angular, showing several issues regarding HTML. The refactoring can be looked at in 
the commit https://github.com/mtellenbach/techradar/commit/d65eef32a97786584d87b4095cc50d43e1c84a6d.

## SW02 - Evolution Of Software Architecture Over The Last Decades

### Exercise 1

#### UML Diagram
While working on the UML-Diagram, I realized that the project is not yet correctly refactored.
It showed, that several unused imports are existing in the backend. Therefore, I removed them in the commit
https://github.com/mtellenbach/techradar/commit/d1809f496c404752c4aa5db8109a30ae25e0bc19.

The UML-Diagram looks as follows:
![Backend UML](https://github.com/mtellenbach/techradar/tree/swat/swat-docs/images/backend-uml.png)

#### Functional Requirement
See here:
https://github.com/mtellenbach/techradar/issues/1

#### Non-Functional Requirement
The system should provide a user-friendly interface for the Administrator, CTO, or TechLead to add new technologies to 
the tech radar. The form for adding a new technology should be intuitive and easy to use, with clear labels for each 
field and helpful error messages if the input is not valid.

Testing:
Interview and observe users while interacting with the platform. Note down important findings and transform them into 
user-stories.