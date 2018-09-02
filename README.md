# csVue
The package serves as a client side CSV downloader. Adds capability to export multilayered property in an object to CSV files

## Dependencies
> VueJS >= 2.0

## Install
```
npm install csvue
```

## Usage
> In Template

```vue
<csvue :columns="cols" :data="dataSet">Download CSV</csvue>
```

> In Script

```js
import csvue from 'csvue';

export default {
  components: { csvue },
  data() {
    return {
      cols: [{
        key: 'a',
        title: 'A'
      }, {
        key: 'b',
        title: 'B'
      }, {
        key: 'c',
        title: 'C'
      }, {
        key: 'x.d',
        title: 'D'
      }],
      dataSet: [
        {'a': 100, 'b': 200, 'c': 300, 'x': { d: 1300 }},
        {'a': 400, 'b': 500, 'c': 600, 'x': { d: 1400 }},
        {'a': 700, 'b': 800, 'c': 900, 'x': { d: 1500 }},
        {'a': 1000, 'b': 1100, 'c': 1200, 'x': { d: 1600 } }
      ]
    };
  }
}
```

## Props

Name | Type| Default | Description
--- | --- | --- | ---
data | Array | `null` | Array of objects that needs to be converted in CSV
columns | Array | `null` | Array objects (each object should have a `key` & a `title` property)<br> `key` = access key in array object. Use `.` to access multilayer property<br>`title` = Title of column
separator | String | `,` | Delimeter to separate cell values. Supported separators are `,`, `;` & `' '`(space)
fileName | String | `csVue` | Name of the file to be downloaded (without file extension)
customStyle | Object | { 'padding': '8px 10px',<br>'background': 'lightgrey',<br>'color': 'darkslategrey',<br>'font-size': '14px',<br>'font-weight': 'bold',<br>'cursor': 'pointer',<br>'border': '1px solid lightgrey',<br>'border-radius': '4px',<br>'outline': 'none' } | Custom style object. It can also be done by styling `csvue-btn` class

## Events

Name | Description
--- | ---
complete | Emitted when data download is completed

## License

[MIT](http://vjpr.mit-license.org)
