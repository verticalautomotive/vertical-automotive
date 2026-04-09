CREATE TABLE `conversation_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`language` varchar(2) NOT NULL DEFAULT 'en',
	`messages` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`sessionId` varchar(64),
	CONSTRAINT `conversation_logs_id` PRIMARY KEY(`id`)
);
