# Notes(draft)

## The LifeCycle
The Life Cycle of the Engine is pretty simple now:

1. Load Everything(loading phase)
    *. JSON/IMAGE/AUDIO Asset Loading
    *. Load subsystems for those assets:
        *. Graphics: Shaders, Buffers(buffer calls load method of entities)

2. Start All Entities(pre-loop)
    *. Calls Start() method of Game, to add any final Assets
    *. Calls Start() method of all Entities(includes start components + behaviors)

3. Game Loop(main loop)
    *. Calls Update() method of all Entities(includes update components + behaviors).
    *. Calls Render() method of all Entities(includes render components).


## TODO

1. Clean-Up Renderer
2. Add VAOs
3. Add Normal Mesh Creation

( then you can release this as version 1.0 or something )
