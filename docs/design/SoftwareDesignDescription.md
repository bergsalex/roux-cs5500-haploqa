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

Example Data can be obtained from the existing legacy version of the application at: https://haploqa.jax.org/

# 5. Architecture and Component Design
## 5.1 Architecture
### 5.1.1 Explanation of Software Architecture
Data-Flow architecture: the target of GKP app is to analyze genome data and data visualization. So that a data flow architecture is good to fit for the design.
Data can be read from database or can be input by the users, then users can select the strains they want to analyze. After that, they can select data analysis models that apply on the strains. Finally, they can visualze the data analysis results.
### 5.1.2 Architectural Diagram
![](https://github.com/bergsalex/roux-cs5500-haploqa/blob/feature/software-design-description-1/docs/design/architecture%20design.png)

## 5.2 Components
### 5.2.1 Explanation of Software Components
The entry of the app is Data upload, strains data can be upload and ready to be analyzed here. The second part is the strain select part, users can select the target strains to be analyzed here. 
The Data analysis separated in two part. One is the front part, in which users can apply models to the strains. The other part is the model modules where all the models are stored. Models can be added, deleted or modified from the backend.
The Data visualization separated in two part as well. Similarly, one is the frontend, another one is the backend.
Additionally, there is a result summary part, which users can download the analyzed results and plots.
### 5.2.2 Software Component Diagram
![](https://github.com/bergsalex/roux-cs5500-haploqa/blob/feature/software-design-description-1/docs/design/component%20design.png)

# 6. Interface Design
## 6.1 Explanation of Interface Design
Interface are designed based on the working flow. There is no fancy design of the interface since it's a scientific app. Generally, there is a name, logo, and introduction chart at the top of each page. 
## 6.2 Wireframes
![](https://github.com/bergsalex/roux-cs5500-haploqa/blob/feature/software-design-description-1/docs/design/InterfaceA.jpeg)
![](https://github.com/bergsalex/roux-cs5500-haploqa/blob/feature/software-design-description-1/docs/design/InterfaceB.jpeg)
![](https://github.com/bergsalex/roux-cs5500-haploqa/blob/feature/software-design-description-1/docs/design/InterfaceC.jpeg)
![](https://github.com/bergsalex/roux-cs5500-haploqa/blob/feature/software-design-description-1/docs/design/InterfaceD.jpeg)

# 7. Procedural Design
## 7.1 Impact/Priority diagram of features
![](https://github.com/bergsalex/roux-cs5500-haploqa/blob/feature/software-design-description-1/docs/design/diagrams-of-features.jpeg)
## 7.2 list of milestones, with detailed sub-lists of accomplishments
1. initial the project: we settle down the teams organization, created some documents and assign the tasks to each member. We also settle down the working rule, we will use the agile development.
2. Complete the design documents: we worked on the documents and completed the SDD, workflow documents and team change documents.
3. Adding the required library: through the developing, we gradually discovered the library we required and we add all the required library. Besides, we also tried to limit the library we totally used in order to keep the app as clear as possible.
4. Add Service 1: we add ChrldsService, dataCache Service and ZoomInterval Service
5. implement data inputs: Feature/implement data inputs for genome karyotype plots 31
6. Re-structure:Moving common svg component func into svg-element common component. 
  Replacing d3 dom manipulation with angular native.
  Adding static data for development
7. Implement the app in more detailed direction:
  Feature/add an svg tools service to hold common d3 dom manipulation code 45
  Adding readme with library usage information
  Adding a strain map service
  
### Development Milestones
#### Milestone 1: Tier 1 Priority
- Feature 4.1: Allow Developers to embed the Genome Karyotype Plots as a module
  - Upgrade d3 v3 to d3 v7
  - Data can be passed into the plots from a parent application component
  - Demonstrate build, setup and usage of plot components in a parent application 
  - The module's usage needs to be well documented and made available for end-user developers. 
  - The visualizations will be resonponsive to user interaction. 
  - The user will interact with the visualization in the same way they did with the previous version. 
  - The visualizations will report errors to the developer to use as they need.

#### Milestone 2: Tier 2 Priority
- Feature 4.2: View a list of all samples
  - The user can see details about each sample
  - Expands the usability of this listing by including additional information
  - The listing page has to be usable on a desktop browser
- Feature 4.3: Search for a sample
  - 
- Feature 4.4: View details about a sample
  - The sample details should be organized in a table format 
  - The Genome Karyotype Plots should be displayed with a minimum of 900px of width

# 8. Pattern(s) Used
## 8.1 Architectural
- Component Based
  - The application to be built will utilize a component architectural pattern to allow rapid reuse of plotting functionality within different Angular client applications.
- Client-Server
  - The application to be built will fit into a client-server architectural pattern with the delivered application acting as the client.
- Representational state transfer
  - The client and server will communicate using Representational State Transfer (ReST) and Javascript Object Notation (JSON).
- Service-oriented
  - The client application will utilize a service oriented architectural pattern for using ReST and JSON to obtain data from one or more servers.
## 8.2 Software
- Singletons
  - Singleton service instance will be used to share data and functionality across plot groups, which are combinations of interval and karyotype plots that use the same data.
- Dependency Injection
  - Dependency injection will be utilized to provide components with instance of singleton service.
- Observer
  - The observer patter will be used to share events between components. An example event would be clicking the kayotype plot selects a detail region in the interval plot.
- Composite
  - The composite pattern will be used to combine objects, services and functionality into higher level entities

# 9. Design Concepts Used
## 9.1 Architectural Design Considerations
The main architectural design we used are:
1. Modularity: due to the requirement, stakeholders expected that the data analyzed package part are loose connected with the other part of the app so that they can make modifications on that module easily. And due to our experience, scientific analysis app requires updates and modification for different part a lot, so we tried to make the architecture modular.
2. Abstraction: to make the app neat to our users, we tired to hide the irrelevant data from them and only expose the part they should interact with or they have some insights about it and maybe want to modify it.
## 9.2 Component Design Principles
CRP and REP
