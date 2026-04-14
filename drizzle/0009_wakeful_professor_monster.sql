CREATE TABLE `backlinks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`website` varchar(512) NOT NULL,
	`contactName` varchar(256),
	`email` varchar(320),
	`dateContacted` varchar(32),
	`status` enum('not_contacted','contacted','follow_up','link_acquired','declined','no_response') NOT NULL DEFAULT 'not_contacted',
	`linkAcquired` int NOT NULL DEFAULT 0,
	`linkUrl` varchar(1024),
	`targetPage` varchar(512),
	`domainAuthority` int,
	`tier` enum('tier1_local','tier2_business','tier3_community','tier4_niche') NOT NULL DEFAULT 'tier1_local',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `backlinks_id` PRIMARY KEY(`id`)
);
