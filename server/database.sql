CREATE TABLE "todo_list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"complete_by_date" DATE NOT NULL,
	"status" BOOLEAN DEFAULT FALSE
);

-- Dummy Data
INSERT INTO "todo_list" 
	("task", "complete_by_date") 
VALUES 
	('Go grocery shopping', '01-01-2023'),
	('Take trash out', '01-01-2023'),
	('Finish Assignment', '02-10-2023'),
	('Grade assignment', '03-21-2023'),
	('Go to the gym', '04-15-2023'),
	('Pick up dog', '04-24-2023');