## Installation

```
npm i reactive-buttons --save
```

## Usage

```js
import React from "react";
import { Button } from "reactive-buttons";

export default function App() {
  return (
    <Button
      bgColor="#0a5cf5"
      textColor="#fff"
      shadow
      ripple
      onClick={(e) => console.log("Hello world!")}
    >
      Hi! I am button
    </Button>
  );
}
```
