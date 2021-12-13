# Complete Project Evaluation
## Project Objectives
We effectively delivered progress toward the overall goal of the HalpoQA project.
> The overall goal of the HaploQA project is to provide capability for interpretation of genotype
calls from the Mouse Universal Genotyping array platforms.

More specifically, we delivered in its entirety the first primary goal of the project:
> Modularize at least one existing visualization. Design should fundamentally enable utilizing modular visualization

We did not deliver on any of the other goals. We explain why in the section on "SRS Requirements" below.

## Customer Satisfaction Survey
A [customer satisfaction survey](/docs/CustomerSatisfactionSurvey_dec_07_2021.md) was written and conducted 
with the client on December 7th, 2021.

## Document Reflection
 - Project Proposal: The project proposal was an extremely useful guiding document, but ultimately did not accurately reflect
the final project objectives. These objectives were better described by the software requirements specification. 

 - **Team Member Assignments**: The team member assigment document was doing more than it needed to. Our open team style allowed for more
flexible team roles than could be described in the static team member assignment document. 
 - **Requirements Documentation**: The requirements' specification was probably the single most useful document created in the 
course of this project. The SRS not only laid the groundwork for the initial work backlog of issues, but also helped to prioritize
those issues according to client priorities.
 - **Process Model Selection**: The process model selection document is subtle but necessary in that it laid out the process by 
which the team would get work done. This process enabled us to smoothly work with each other and our development tools. 
 - **Software Design Documentation**: The SDD struggled to gain usefulness with this project. Due to the fast nature of the iterative
design, the document often lagged behind the reality of the software design. 
 - **Testing Documentation - Planning**: The test plan document was difficult to write until later in the project, but turned out to be
extremely useful. If I were to do this again, I would write a test plan much earlier on, even if it only defined high level tasks. 
 - **Testing Documentation - Results**:  The test results document was redundant in that we have these results in other places. 
The document makes sense for a submission, but without an external motivator like 
 - **Complete Project Evaluation**: This was a useful exercise for class, but I would much prefer frequent retrospectives to acomplish this goal.

## SRS Requirements
Of our initially defined four software requirements (see section 4 of the Software Requirements Specification), 
we had divided these goals into two categories: Tier-1 and Tier-2. We delivered all of our Tier-1 goals (requirement 4.1) 
and made design and planning progress on our Tier-2 goals.

We were not able to functionally deliver any of our Tier-2 goals (requirements 4.2, 4.3 and 4.4). During requirements 
gathering the client had indicated that absolute priority was to be placed on the project's Tier-1 goals. This resulted 
in deprioritizing delivery of Tier-2 goals when it was discovered that the legacy code was more complex and the 
development team less experienced than was expected during initial project planning.

Though we did not functionally deliver on requirements 4.2, 4.3, or 4.4, we provided the client designs and diagrams 
for work on these requirements as well as a code repository with a skeleton Angular application that utilizes the 
visualization package (requirement 4.1), and which has integrated and automated system and integration testing.

### Requirements:
#### 4.1 (Tier-1): Allow Developers to embed the Genome Karyotype Plots as a module
Status: Use case delivered

#### 4.2 (Tier-2): View a list of all samples
Status: Use case NOT delivered

#### 4.3 (Tier-2): Search for a sample
Status: Use case NOT delivered

#### 4.4 (Tier-2): View details about a sample
Status: Use case NOT delivered

## Lessons Learned
- I would put more work in earlier on to make sure everyone on the project had work that matched their skillet and ability.
- Synchronous Agile is hard with a two-person team split between time zones
  - Asynchronous agile works well when possible 
- The iterative foundation of Agile was “essential” to being able to complete the migration in the limited timeframe 
  - Tasks were defined first at a high level, lower and lower level tasks were defined as effort progressed and the migration details became clear. 
- With an iterative design process, design patterns formed the foundation of how the migration was completed. 
  - Dependency injection, composition and singleton services were incredibly useful.
- Defining the goals and priorities with the client early was key to successful delivery 
  - Most importantly, determining what the client thought of as “must haves” vs “nice to haves” 
- Defining CI/CD early in the project and requiring successful tests and builds before merging a pull request was a lifesaver

