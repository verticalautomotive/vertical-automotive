CREATE TABLE `aistudio_conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`language` varchar(2) NOT NULL DEFAULT 'en',
	`status` enum('active','escalated','closed') NOT NULL DEFAULT 'active',
	`needsHuman` int NOT NULL DEFAULT 0,
	`escalationReason` text,
	`userIdentifier` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `aistudio_conversations_id` PRIMARY KEY(`id`),
	CONSTRAINT `aistudio_conversations_sessionId_unique` UNIQUE(`sessionId`)
);
--> statement-breakpoint
CREATE TABLE `aistudio_escalations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`reason` text NOT NULL,
	`status` enum('pending','assigned','resolved') NOT NULL DEFAULT 'pending',
	`assignedTo` varchar(320),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `aistudio_escalations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `aistudio_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`role` enum('user','model') NOT NULL,
	`content` text NOT NULL,
	`confidence` varchar(10),
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `aistudio_messages_id` PRIMARY KEY(`id`)
);
