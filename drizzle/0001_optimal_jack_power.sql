CREATE TABLE `knowledge_base` (
	`id` int AUTO_INCREMENT NOT NULL,
	`section` varchar(64) NOT NULL,
	`sourceUrl` varchar(512) NOT NULL,
	`content` text NOT NULL,
	`syncedAt` timestamp NOT NULL DEFAULT (now()),
	`lastStatus` varchar(64) NOT NULL DEFAULT 'pending',
	CONSTRAINT `knowledge_base_id` PRIMARY KEY(`id`),
	CONSTRAINT `knowledge_base_section_unique` UNIQUE(`section`)
);
