export default {
    /*
     * exportToCSV 导出CSV
     * @ param  {Array} data 导出数据 必填项
     * @ param  {Array} columns 导出表头 必填项 
     * @ param  {String} fileName 导出文件名称
     */
    exportToCSV(data = [], columns = [], fileName = 'userExportToCSV') {
        if (!data.length && !columns.length) {
            console.error('\u5bfc\u51fa\u6570\u636e\u548c\u8868\u5934\u4e0d\u4e3a\u7a7a');
            return this;
        }
        const bw = this.browser();
        if (bw['ie'] < 9) return this;
        let CSV = '',
            arr = [],
            colKey, curvalue;
        columns.forEach(function (item) {
            arr.push(item.title || item.key);
        });
        CSV = CSV + arr.join(',') + '\r\n';
        data.forEach(function (item) {
            arr = [];
            curvalue = '';
            columns.forEach(function (col) {
                colKey = col.key;
                if (typeof item[colKey] == 'string' || typeof item[colKey] === 'number') {
                    curvalue = typeof col.formatter === 'function' ? col.formatter(item, col, colKey) : item[colKey];
                    curvalue = typeof curvalue === 'function' ? '' : curvalue + '';
                    curvalue = curvalue.replace(/\,/ig, '');
                }
                arr.push(curvalue);
            })
            CSV = CSV + arr.join(',') + '\r\n';
        })
        this.SaveAs(fileName, CSV);
    },
    SaveAs(fileName = '', csvData = '') {
        const bw = this.browser();
        if (!bw['edge'] || !bw['ie']) {
            let alink = document.createElement("a");
            alink.id = "linkDwnldLink";
            alink.href = this.getDownloadUrl(csvData);
            document.body.appendChild(alink);
            let linkDom = document.getElementById('linkDwnldLink');
            linkDom.setAttribute('download', fileName);
            linkDom.click();
            document.body.removeChild(linkDom);
        } else if (bw['ie'] >= 10 || bw['edge'] == 'edge') {
            let _utf = "\uFEFF";
            let _csvData = new Blob([_utf + csvData], {
                type: 'text/csv'
            });
            navigator.msSaveBlob(_csvData, fileName);
        } else {
            let oWin = window.top.open("about:blank", "_blank");
            oWin.document.write('sep=,\r\n' + csvData);
            oWin.document.close();
            oWin.document.execCommand('SaveAs', true, fileName);
            oWin.close();
        }
    },
    getDownloadUrl(csvStr = '') {
        let _utf = "\uFEFF"; // 为了使Excel以utf-8的编码模式，同时也是解决中文乱码的问题
        if (window.Blob && window.URL && window.URL.createObjectURL) {
            let csvData = new Blob([_utf + csvStr], {
                type: 'text/csv'
            });
            return URL.createObjectURL(csvData);
        }
    },
    browser() {
        const Sys = {};
        const ua = navigator.userAgent.toLowerCase();
        let s;
        (s = ua.indexOf('edge') !== -1 ? Sys.edge = 'edge' : ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1]:
            (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
            (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
            (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
        return Sys;
    }
}