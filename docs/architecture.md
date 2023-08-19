# Architecture

- [Base rules](#base-rules)
- [Folder structure](#folder-structure)
- [Core libraries](#libraries)
- [Component](#component)
- [Container](#container)
- [Service](#service)

## <a name="base-rules"></a> Base rules

1. **Correct typescript code**
   - Use `type` instead of `interface` 
   - Prohibited to use `as`
   - Prohibited to use `any`
   - Prohibited to use `@ts-ignore`
2. **Eslint**
   - All code should be written in according to eslint rules. Do not use `eslint-ignore`.
3. **Only functional components**
4. **Files and folders should be named in kebab-case style**
   - Correct (kebab-case):
     ```
     components/
       search-field/
         search-field.tsx
         search-field.interface.ts
         search-field.styled.ts
         index.ts
     ```
   - Incorrect (PascalCase):
      ```
       components/
         SearchField/
           SearchField.tsx
           SearchField.interface.ts
           SearchField.styled.ts
           index.ts
     ```
5. **Imports**
   - An absolute path should start with `@`, which means the path starts from `~/Project/src/`. Do not add any more aliases.
     - Correct:
      ```ts
       import { BeautifulComponent } from '@/modules/core/components';
     ```
     - Incorrect:
      ```ts
       import { BeautifulComponent } from '@core-components';
       import { BeautifulComponent } from '../../../core/components/beautiful-component';
     ```
   - Use absolute path for all project imports except interfaces and styles in scope of component folder
     - Correct:
        ```ts
        // components
        import { Avatar, TextField } from '@/modules/core/components';
       
        import type { BeautifulComponentProps } from './beautiful-component.interface';
        import { Root } from './beautiful-component.styled';
       
        export const BeautifulComponent: FC<BeautifulComponentProps> = () => {}
       ```
     - Incorrect:
        ```ts
        // components
        import { Avatar } from '../../../core/components/avatar';
        import { TextField } from '../../../core/components/text-field';
       
        import type { BeautifulComponentProps } from 'modules/core/components/beautiful-component.interface.ts';       
       
        export const BeautifulComponent: FC<BeautifulComponentProps> = () => {}
       ```
   - All project imports should be grouped with comments (types, components, constants, etc...) except external dependencies and component interfaces and styles in scope of component folder (they should be divided with blank line)
       - Correct:
          ```ts
          import React, { type FC, useEffect } from 'react';
          // hooks
          import { useSignInRequest } from '@/modules/auth/hooks/use-sign-in-request';
          // components
          import { Avatar, TextField } from '@/modules/core/components';
         
          import type { BeautifulComponentProps } from './beautiful-component.interface';
          import { Root } from './beautiful-component.styled';
         
          export const BeautifulComponent: FC<BeautifulComponentProps> = () => {}
         ```
       - Incorrect:
          ```ts
          import React, { type FC, useEffect } from 'react';
          import { Avatar, TextField } from '@/modules/core/components/avatar';
          import { useSignInRequest } from '@/modules/auth/hooks/use-sign-in-request';
          import type { BeautifulComponentProps } from './beautiful-component.interface';
         
          import { Root } from './beautiful-component.styled';
         
          export const BeautifulComponent: FC<BeautifulComponentProps> = () => {}
         ```
   - Use `type` prefix for all type imports
     - Correct:
        ```ts
        import { type FC } from 'react';
        import type { BeautifulComponentProps } from './beautiful-component.interface'
         ```
     - Incorrect:
        ```ts
        import { FC } from 'react';
        import { BeautifulComponentProps } from './beautiful-component.interface';
       ```
> Note! If one of rules above must be violated for an important reason, please leave `todo` comment in the code and create an issue in the GitHub

## <a name="folder-structure"></a> Folder structure

1. **assets**

    Static files, such as icons, images, fonts, etc... Each kind of asset should have an individual folder.
    ```
    src/
      assets/
        icons/
          my-icon.svg
        images/
          my-image.jpg
        fonts/
   ```
2. **declarations**

    Global type declarations. 

3. **modules**

    Module - independent project entity that contains ui, data, domain logic of this entity. 
    ```
    src/
      modules/
        user/
        location/
        auth/
   ```
   
4. **styles**

     Theme, global styles, style helpers, etc...

## <a name="service"></a> Core libraries

1. todo

## <a name="component"></a> Component

Component it's a simple, reusable ui element that display view depends **only** on props. We create folder with for each component. The component does not have access to global store and domain logic.

Each component consists of next folders:
1. **component-name.interface.ts** - includes types that used in this component (prop types etc...)
2. **component-name.styled.ts** - includes styled elements
3. **component-name.tsx** - component markup (jsx)
4. **component-name.stories.tsx** - storybook story
5. **index.ts** - reexport from `component-name.tsx`

## <a name="container"></a> Container

Container it's a [component](#component) which have access to domain logic, global storage. Usually containers uses only once in the application. For example - sign in form, etc... .

## <a name="service"></a> Service

todo

```ts
@signleton()
@injectable()
class DeskCheckOutService implements ICheckOutService {
  // ...
}
```
