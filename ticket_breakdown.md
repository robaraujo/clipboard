## Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

Data is saved in the database in the Facilities, Agents, and Shifts tables
A function getShiftsByFacility is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
A function generateReport is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

You've been asked to work on a ticket. It reads:

Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Tickets
For the tickets below, I'm assuming that:
1) Custom agent ID may be different for the same agent but in a different facility.
2) We are not using any ORM that will automatically add the AgentsFacilities to the Agents queries.

### **TASK 1: Create AgentsFacilities table**

**Acceptance criteria:**:  
Create the new AgentsFacilities table to save custom agent ID for each facility.

**Implementation details**:  
Table details:    
CREATE TABLE IF NOT EXISTS AgentsFacilities(  
  agent_id INTEGER,  
  facility_id INTEGER,  
  custom_agent_id VARCHAR(255),  
  FOREIGN KEY (agent_id) REFERENCES Agents(id) ON DELETE CASCADE,  
  FOREIGN KEY (facility_id) REFERENCES Facilities(id) ON DELETE CASCADE,  
)  
Create migrations and seeds if applicable.  

**Time estimates:** 2 hours

### **TASK 2: Create AgentsFacilities Endpoint**

**Acceptance criteria:**:  
Create an endpoint that will receive the agentId and customAgentId and generate a new registry into AgentsFacilities using the logged Facility as facility_id. 
Empty customAgentId can be informed   
Before saving a new AgentsFacilities, make sure:  
1) AgentsFacilities row is unique for this agent/facility, otherwise remove old rows  
2) customAgentId is unique for this facility, unless it's empty.  

**Implementation details**:  
Endpoint details:  
Post /agents-facilities  
Payload: { agentId: number, customAgentId: string }  
Response Status 200: Success  
Response Status 422: Unprocessable Entity  

**Time estimates:** 2 hours

**Dependencies:**:  
1: Create AgentsFacilities table  

### **TASK 3: Add AgentsFacilities data to GET /agent/id**  
**Acceptance criteria:**  
Update GET /agent/id to return AgentsFacilities related to it

**Implementation details:**  
New Agents response will be:
{ ...oldResponse, agentsFacility: { customAgentId } }

**Time estimates:** 1 hour

**Dependencies:**:  
1: Create AgentsFacilities table  
2: Create AgentsFacilities Endpoint  

### **TASK 4: Update getShiftsByFacility and generateReport**
**Acceptance criteria:**  
Update getShiftsByFacility function to also fetch AgentsFacilities tables related to the agent.
Into the generateReport, add a Custom Agent ID column if it exists for the current client.

**Implementation details:**   
getShiftsByFacility: Insert a left join with the AgentsFacilities, adding the column customAgentId to the query response. 
generateReport: Add the row.customAgentId to the report or show an empty column.

**Time estimates:** 2 hours

**Dependencies:**:  
1: Create AgentsFacilities table  
2: Create AgentsFacilities Endpoint  

### **TASK 5: UX - Create Custom Agent ID Section**
**Acceptance criteria:**  
Add new section into Agent profile showing custom agent ID
Insert Add/Edit button next to the custom ID, this action will open a form to submit Custom ID field

**Implementation details:**  
1) Custom Agent ID value should be in agent.agentsFacility?.customAgentId
2) For endpoint reference, look at Task 2: Create AgentsFacilities Endpoint

**Time estimates:** 3 hours

**Dependencies:**:  
1: Create AgentsFacilities table  
2: Create AgentsFacilities Endpoint  
3: Add AgentsFacilities data to GET /agent/id  