# Star Wars Combine Web Services 2.0 JS/TS SDK

>[!note]
>This is an unoffical SDK built and distributed by a cohort of developers who also enjoy the Combine.

Typescript and Javascript SDK for the Star Wars Combine 2.0 Web Services.
The SDK is currently a WIP. Status is as follows:

## API SDK Status

- :x: = Not yet implemented
- :construction: = Partially implemented
- :heavy_check_mark: = Implemented
- :white_check_mark: = Implemented and covered by tests

| Endpoint                                   | Status             | Availability     | OAuth scope required (if applicable)                                                                       |
|--------------------------------------------|--------------------|------------------|------------------------------------------------------------------------------------------------------------|
| **<h3>OAuth</h3>**                         | :x:                | Public           |                                                                                                            |
| Get token using server flow (node.js only) | :x:                | Public           |                                                                                                            |
| Get token using client flow (browser only) | :x:                | Public           |                                                                                                            |
| Get granted permissions                    | :x:                | OAuth :lock:     |                                                                                                            |
| **<h3>Permissions</h3>**                   | :x:                |                  |                                                                                                            |
| List permissions                           | :heavy_check_mark: | Public           |                                                                                                            |
| **<h3>Rate Limits</h3>**                   | :x:                |                  |                                                                                                            |
| List rate limits                           | :x:                | Public           |                                                                                                            |
| **<h3>Time</h3>**                          | :white_check_mark: |                  |                                                                                                            |
| Get current SWC time                       | :white_check_mark: | Public/on device |                                                                                                            |
| Convert between SWC and Unix time          | :white_check_mark: | Public/on device |                                                                                                            |
| Convert between SWC time and Date objects  | :white_check_mark: | Public/on device |                                                                                                            |
| **<h3>Character</h3>**                     | :x:                |                  |                                                                                                            |
| Get character info                         | :x:                | OAuth :lock:     | character_read                                                                                             |
| Get character's credits                    | :x:                | OAuth :lock:     | character_credits                                                                                          |
| Get character's creditlog                  | :x:                | OAuth :lock:     | character_credits                                                                                          |
| Get UID by handle(handlecheck)             | :x:                | Public           |                                                                                                            |
| List received messages                     | :x:                | OAuth :lock:     | messages_read                                                                                              |
| List sent messages                         | :x:                | OAuth :lock:     | messages_read                                                                                              |
| Send message from character                | :x:                | OAuth :lock:     | messages_send                                                                                              |
| Get message by id                          | :x:                | OAUth :lock:     | messages_read                                                                                              |
| Delete message by id                       | :x:                | OAuth :lock:     | messages_delete                                                                                            |
| Get character's skills                     | :x:                | OAuth :lock:     | character_skills                                                                                           |
| List character's privileges                | :x:                | OAuth :lock:     | character_privileges                                                                                       |
| Check if character has privilege           | :x:                | OAuth :lock:     | character_privileges, and must be logged in as someone that can view the privileges of others.             |
| Grant privilege to a character             | :x:                | OAuth :lock:     | character_privileges, and must be logged in as someone that has the ability to grant privileges to others. |
| Revoke privilege from character            | :x:                | OAuth :lock:     | character_privileges, and must be logged in as someone that can grant/revoke privileges of others.         |
| **<h3>Datacard</h3>**                      | :x:                |                  |                                                                                                            |
| List datacards                             | :x:                | OAuth :lock:     | faction_datacards_read                                                                                     |
| Get datacard                               | :x:                | OAuth :lock:     | faction_datacards_read                                                                                     |
| Assign datacard                            | :x:                | OAuth :lock:     | faction_datacards_write                                                                                    |
| Delete datacard assignment                 | :x:                | OAuth :lock:     | faction_datacards_write                                                                                    |
| **<h3>Events</h3>**                        | :x:                |                  |                                                                                                            |
| List events for character                  | :x:                | OAuth :lock:     | character_events                                                                                           |
| Get event by uid                           | :x:                | OAuth :lock:     | character_events                                                                                           |
| **<h3>Factions</h3>**                      | :x:                |                  |                                                                                                            |
| List factions                              | :x:                | Public           |                                                                                                            |
| Get faction by uid                         | :x:                | Public           |                                                                                                            |
| Get faction credits                        | :x:                | OAuth :lock:     | faction_credits_read                                                                                       |
| Get faction's creditlog                    | :x:                | OAuth :lock:     | faction_credits_read                                                                                       |
| Send faction credits                       | :x:                | OAuth :lock:     | faction_credits_write                                                                                      |
| List faction's budgets                     | :x:                | OAuth :lock:     | faction_budgets_read                                                                                       |
| Get faction budget by uid                  | :x:                | OAuth :lock:     | faction_budgets_read                                                                                       |
| List faction members                       | :x:                | OAuth :lock:     | faction_members                                                                                            |
| Update faction member's infofields         | :x:                | OAuth :lock:     | faction_members, and must be logged in as someone that can update infofields                               |
| List faction's stock holders               | :x:                | OAuth :lock:     | faction_stocks                                                                                             |
| **<h3>Galaxy</h3>**                        | :x:                |                  |                                                                                                            |
| List sectors                               | :x:                | Public           |                                                                                                            |
| Get sector by uid                          | :x:                | Public           |                                                                                                            |
| List systems                               | :x:                | Public           |                                                                                                            |
| Get system by uid                          | :x:                | Public           |                                                                                                            |
| List planets                               | :x:                | Public           |                                                                                                            |
| Get planet by uid                          | :x:                | Public           |                                                                                                            |
| List stations                              | :x:                | Public           |                                                                                                            |
| Get station by uid                         | :x:                | Public           |                                                                                                            |
| List cities                                | :x:                | Public           |                                                                                                            |
| Get city by uid                            | :x:                | Public           |                                                                                                            |
| **<h3>Inventory</h3>**                     | :x:                |                  |                                                                                                            |
| List inventories                           | :x:                | OAuth :lock:     | [personal/faction]_inv_overview                                                                            |
| List entities in inventory                 | :x:                | OAuth :lock:     | [personal/faction]\_inv_[inventory]_read                                                                   |
| Get one entity in inventory                | :x:                | OAuth :lock:     | [personal/faction]\_inv_[inventory]_read                                                                   |
| Modify entity info                         | :x:                | OAuth :lock:     | [personal/faction]\_inv_[inventory]_assign                                                                 |
| Rename entity                              | :x:                | OAuth :lock:     | [personal/faction]\_inv_[inventory]_rename                                                                 |
| Makeover entity                            | :x:                | OAuth :lock:     | [personal/faction]\_inv_[inventory]_makeover                                                               |
| Apply tag to entity                        | :x:                | OAuth :lock:     | [personal/faction]\_inv_[inventory]_tags_write                                                             |
| Remove tag from entity                     | :x:                | OAuth :lock:     | [personal/faction]\_inv_[inventory]_tags_write                                                             |
| Clear all tags from entity                 | :x:                | OAuth :lock:     | [personal/faction]\_inv_[inventory]_tags_write                                                             |
| **<h3>Location</h3>**                      | :x:                |                  |                                                                                                            |
| Get location for specified entity          | :x:                | OAuth :lock:     | character_location                                                                                         |
| **<h3>Market</h3>**                        | :x:                |                  |
| List all public market vendors             | :x:                | Public           |
| Get vendor info                            | :x:                | Public           |
| **<h3>News</h3>**                          | :x:                |                  |                                                                                                            |
| List GNS news                              | :x:                | Public           |                                                                                                            |
| Get one GNS Item                           | :x:                | Public           |                                                                                                            |
| List Sim news                              | :x:                | Public           |                                                                                                            |
| Get one Sim news item                      | :x:                | Public           |                                                                                                            |
| **<h3>Types</h3>**                         | :x:                |                  |                                                                                                            |
| List classes of type                       | :x:                | Public           |                                                                                                            |
| List entities of type                      | :x:                | Public           |                                                                                                            |
| List entities by class and type            | :x:                | Public           |                                                                                                            |
| Get type for existing entity               | :x:                | Public           |                                                                                                            |
| List all entity types                      | :x:                | Public           |                                                                                                            |

