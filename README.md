GetWell
=======

A tool for monitoring the state of vaccination refrigeration units.

**Data Model**
*Fridge* The permanent (i.e. name, location) and latest transient data
  of a fridge.
*FridgeStatus* A single report of transient data (i.e. usingBattery,
battery level).

**Source Layout**

*cloud/* Cloud code

  - main.js code deployed on parse. Publishes FridgeStatus objects to Fridges 
    and sends pushes if the update warrants concern.
  - cron.js node.js code which periodically to detects Fridges which are not
    updated (automatically by a FridgeStatus being published)

*config/* Configuration directory for cloud code. Automatically created
by parse

*fridge_sim/* scripts used for simulating a series of fridges. Each
assumes a fridgestatus directory.

  - create_mock_files.py [int threshold] Downloads the list of all known
    Fridge objects from Parse and creates a file that allows the fridge
    to be mocked. If specified, threshold states the percentage that
    should be mocked as powered, else 100% are powered.
  - update_all_statuses.py Should be run in the background during demos.
    Sends heartbeat signals.
  - update_chagned_statuses.py Should be run in the background during
    dmeos. Sends updates more quickly if a mock file is modified.
  - discharge.py [fridge] Simulates a fridge being disconnected from
    power. fridge is the name of a fridge without spaces.
  - charge.py [fridge] Simulates a fridge being reconnected to power.
    fridge is the name of a fridge without spaces.
  - malfunction.py [fridge] Simulates a fridge malfunction. It will stop
    sending heartbeats in update_all_statuses.py. fridge is the name of
    a fridge without spaces.

*ios/* A project which allows users to register for pushes when a fridge
needs attention

*www/* HTML5 web application displaying global fridge statuses.
