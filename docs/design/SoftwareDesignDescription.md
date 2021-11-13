# Software Design Documentation
#### Project: HaploQA / CS5500 Project
#### Authors: Alexander Berger, Fangrui Guo
#### Stakeholders: Dave Walton, Anna Lamoureux, Laura Reinholdt
#### Version: 1.1

# 1. Introduction 
## 1.1 Purpose 
The purpose of this document is to describe the architecture and design of the modularization of the
HaploQA application. This application was originally developed by Anna Lamoureux and Dave Walton for
Laura Reinholdt. Alexander Berger, Fangrui Guo, Jasmine Owens, and Sanyami Shah will be working on 
the modularization project as a team.


## 1.2 Scope 
This project intends primarily to recreate a Genome Karyotype Plot (GKP) data visualization tool in 
a modularized manner such that the GKP tool can pull from alternate databases or be hosted in 
different platforms. If time permits, this project may be extended to modularize other portions of 
the system, such as a Genome Interval Plot (GIP) data visualization tool, database requests, data 
collection systems, and the app itself.


## 1.3 Definitions
**HaploQA** - Tool to facilitate genetic quality assurance of mice using genotype data derived from 
**genotyping** platforms such as GigaMUGA and MegaMUGA 
**GigaMUGA** - third-generation genotyping array for mice
**MegaMUGA** - second-generation genotyping array for mice
**GKP** - Genome Karotype Plot (data visualization tool)
**GIP** - Genome Interval Plot (data visualization tool, a child of GKP)

## 1.4 References
The design of this document is loosely based on a document on tidyforms.com, which was accessed via
[this link.](https://devlegalsimpli.blob.core.windows.net/pdfseoforms/pdf-20180219t134432z-001/pdf/software-design-document-2.pdf)

The original project HaploQA files are located on 
[GitHub](https://github.com/TheJacksonLaboratory/haploqa)

# 2. User Requirements
2.1:  Visualization tool should be highly modularized; tool should be able to be embedded in 
different platforms and interface with various database formats, possibly through some sort of 
common data export format.

2.2 Documentation for module use should be provided so that other teams can continue development in 
other directions.


# 3. Functional Requirements
3.1:  GKP should operate on one user-defined sample upon which genotype analysis will be run.

3.2: GKP should allow the user to select mouse strains from a curated list of strain exemplars.
 
3.3: GKP should update visualization based on selected mouse strains.

3.4: GKP should be able to change database source in anticipation of future database updates.

3.5: GKP should not be tied to HaploQA app so that it can be reused in different contexts.


# 4. Data Design 
Data will be provided by an API developed and defined by The Jackson Laboratory.

# 5. Architecture and Component Design
## 5.1 Architecture
### 5.1.1 Explanation of Software Architecture
Data-Flow architecture: the target of GKP app is to analyze genome data and data visualization. So that a data flow architecture is good to fit for the design.
### 5.1.2 Architectural Diagram



## 5.2 Components
### 5.2.1 Explanation of Software Components
### 5.2.2 Software Component Diagram

# 6. Interface Design
## 6.1 Explanation of Interface Design
## 6.2 Wireframes

# 7. Procedural Design
## 7.1 Impact/Priority diagram of features
## 7.2 list of milestones, with detailed sub-lists of accomplishments

# 8. Pattern(s) Used
## 8.1 Architectural
## 8.2 Software

# 9. Design Concepts Used
## 9.1 Architectural Design Considerations
## 9.2 Component Design Principles
