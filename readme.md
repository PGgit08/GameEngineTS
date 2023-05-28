# GameEngineTS
A basic 2D Game Engine written with Typescript and WebGL. (WORK IN PROGRESS)


# Testing
To test run -> **npm run dev**


# Todo
- Movement along local axis. -- DONE
- Component/Behavior/Entity/Scene localizing -- ALMOST DONE
- Entity Spawning / Despawning -- DONE
- Sprites (+ Animated Sprites) -- DONE
- Lighting, Cameras -- CAMERAS DONE, LIGHTING NOW
- Physics (matter.js) / Collsion
- Entity Communication (+ Events)


# Usage
Projects should be structures accordingly: 
- **main.ts** -> The main file that contains the Engine instance. The Engine Instance should be supplied with a EngineConfig which can use items from the folders below or sample items from the engine.
- **behaviors** -> A folder containing all the Behaviors that will be used.
- **entities** -> A folder containing reusable Entities.
- **scenes** -> A folder containing the game Scenes.


# Description
## ECS
The core of the engine is the Entity-Component System (ECS). Entities are objects that follow the engine Lifecycle and that have Components and Behaviors, which are classes that follow the engine Lifecycle and get called by their parent Entity. Entities also have child Entities, which get called by their parent Entity. These Entities are linked to their own Scenes that are also Lifecycle objects and they get called by the Engine class. Another important class that is used in this system is the GameObject class. A GameObject is simply a base class for any object with a unique ID and a name. The GameObject base class is used by ECS for hierarchical objects such as an Entity/Component/or Scene. 

## Lifecycle
An interface that has all the Lifecycle methods the engine uses.
- load(): void -> called ONCE during loading period and ONCE during Spawn
- start(): void -> called ONCE in the game AFTER loading period
- update(): void -> called during frame update and should be used for any pre-render actions
- render(): void ->  called durign frame update and should be used for rendering

## Graphics
The Mesh class is the main graphics item in the engine. It takes in a Geometry class specifying the verticies that make up the Mesh and a Material class specifying the color/texture and other material features of the Mesh. The Sprite class is what gets used by the user. A SpriteComponent gets fed with a Sprite which can inputs an optional Texture, rendering Frame, and other optional information such as custom Geometry and origin for pivot. The AnimatedSprite class is an extension of the Sprite class which can be used to form Sprite animations given a configuration that specifies the order of Frames to use for the animation and time per frame (config is called AnimatedSpriteConfig).

## Cameras
-- EXPLANATION TODO --

## Custom Shaders (tutorial ngl)
Custom Shaders along with their custom Materials can be made in the engine. To create a custom Shader, it must have the required attributes and uniforms that are in the ShaderConfig class. An example Shader having these requirments exists in the engine and is called StandardShader. It has a Material linked to it called StandardMaterial which uses a Color field and a Texture field. When creating a custom Material for a custom Shader, the "applyAdditionalUniforms" abstract method should be overriden and should apply any standard uniforms to the custom Shader.

## Custom Geometries (tutorial ngl)
Custom Geometry can also be created in the engine. The "textureData" and "positionData" abstract methods should be overriden and should set the REQUIRED texture and position attributes. Additional Buffers and attributes can be added to a custom Geometry through the "addBuffer" and "addAttribute" methods.

## Managers
A Manager is a singleton class that stores instances of GameObjects with unique names that can be retrieved and modified.
- **ShaderManager** -> A Manager that stores instances of Shaders that can be used by Materials.
- **RendererManager** -> A Manager that stores instances of Renderers.
- **SceneManager** -> A Manager that stores Scenes and calls Lifecycle methods on the current Scene.
- **TextureManager** -> A Manager that stores Texture GameObjects that can be used by Sprites.

