<p align="center">

<img width="382" alt="image" src="https://user-images.githubusercontent.com/102238922/196332498-7fad9978-de4f-47b1-8a2b-4fdfc31dbb34.png">


<br>
<br>
Easy, tiny, modern web APIs lib based on <a href="https://developer.mozilla.org/en-US/docs/Web/API">Web API</a>
</p>


## APIs

> **[Timer](/packages/timer)**: Timer APIs based on `Promise`, `setTimeout`, `setInterval`.

`sleep` `timeout` `pauseTimeout` `pauseInterval`

<br>

> **[Fullscreen](/packages/fullscreen)**: More compatibility fullscreen APIs based on [Web Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API).

`fullscreenSupported` `fullscreenElement` `requestFullscreen` `exitFullscreen` `onFullscreen`

<br>

> **[Styled-log](/packages/styled-log)**: Log text in custom css style based on [Web Console API](https://developer.mozilla.org/en-US/docs/Web/API/Console_API).

`log` `warn` `error` `debug` `styled`

<br>

> **[Battery](/packages/battery)**: Get and watch battery status via [Web Battery API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API).

`batterySupported` `getBattery`

<br>

> **[Storage](/packages/storage)**: Client storage APIs based on [Web localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

`storage.getItem` `storage.setItem` `storage.getJson` `storage.setJson` `storage.removeItem` `storage.hasItem` `storage.staleItem` `storage.clear`

<br>

> **[Clipboard](/packages/clipboard)**: Clipboard APIs based on [Web Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).

`clipboardSupported` `readSupported` `readTextSupported` `writeSupported` `writeTextSupported` `read` `write`