# 导出CSV格式文件

## ES6方式引入

```html
<button id="export">导出</button>
<script>
    import exportCsv from './export-to-CSV.js';
    const btn = document.querySelector('#export');
    btn.addEventListener('click', () => {
        exportCsv.exportToCSV(
            [
                { a: 1, b: 2 }
            ],
            [
                { key: 'a', title: 'val1' },
                { key: 'b', title: 'val2', formatter: (row, col, key) =>  row[key] + '%';  }
            ],
            'test'
        )
    })
</script>
```

## 浏览器方式

``` html
<button id="export">导出</button>
<script src="./export-to-CSV.min.js"></script>
<script>
    var btn = document.querySelector('#export');
    var exportCsv = exportToCSV;
    btn.addEventListener('click', function() {
        exportCsv.exportToCSV(
            [
                { a: 1, b: 2 }
            ],
            [
                { key: 'a', title: 'val1' },
                { key: 'b', title: 'val2', formatter: function (row, col, key) { return row[key] + '%'; } }
            ],
            'test'
        )
    })
</script>
```
