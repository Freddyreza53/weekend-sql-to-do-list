CREATE TABLE "todo_list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"complete_by_date" DATE NOT NULL,
	"status" BOOLEAN DEFAULT FALSE
);