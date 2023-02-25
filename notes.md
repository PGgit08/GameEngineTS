# File Names: UPPERCASE
# Folder Names: lowercase

# Asset Loading System (IDEA):
- Initially create DefaultRenderer and set it as the current Renderer. After load Asset Renderers and if one is "default", set it as current Renderer.

- Create Shaders and add them. Then load all of them through ShaderManager.

- Load custom Meshes from OBJ asset files (**NOT HERE YET**)

- After loading that, initially create DefaultScene and set it as the current Scene. After load Scenes and if one is "default" set it as current Renderer.

- **Prefabs should also exist and Entity Spawn / Destroy**

# TODO
- Movement along local axis. -- DONE
- Textures, Lighting, Prefabs, Asset Loading.

# Lifecycle:
- load() -> called ONCE during loading period, called ONCE during Entity Spawn (NOT MADE YET)
- start() -> called ONLY ONCE in the whole game after loading period
- update() -> called ONCE per frame update, before render
- render() -> called ONCE per frame update, for render

