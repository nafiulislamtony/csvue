<template>
  <button class="csvue-btn"
          :style="buttonStyle"
          @click="onDownloadBtnClicked"
          :disabled="isDownloading">
    <slot></slot>
  </button>
</template>

<script>
  const getHeaderRow = (columns, separator) => {
    let headerRow = '';

    columns.forEach(col => {
      headerRow += `${col.title}${separator}`;
    });

    return `${headerRow}\n`;
  };

  const getBodyXML = (downloadData, columns, separator) => {
    let bodyXML = '';

    downloadData.forEach((row, index) => {
      columns.forEach(header => {
        const keys = header.key.split('.');
        let val = row;

        keys.forEach(key => {
          val = val[key];
        });

        bodyXML += `${val}${separator}`;
      });

      if (index < downloadData.length) {
        bodyXML += '\n';
      }
    });

    return bodyXML;
  };


  export default {
    name: 'vue-download-csv',
    data() {
      const ourStyle = {
        'padding': '8px 10px',
        'background': 'lightgrey',
        'color': 'darkslategrey',
        'font-size': '14px',
        'font-weight': 'bold',
        'cursor': 'pointer',
        'border': '1px solid lightgrey',
        'border-radius': '4px',
        'outline': 'none'
      };

      return {
        isDownloading: false,
        buttonStyle: Object.assign({}, ourStyle, this.customStyle)
      };
    },
    props: {
      customStyle: {
        type: Object
      },
      data: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true,
        validate: (items) => {
          let isInvalid = false;

          items.forEach((item) => {
            if (!item.hasOwnProperty('key') || !item.hasOwnProperty('title')) {
              isInvalid = true;
            }
          });

          return isInvalid
        }
      },
      fileName: {
        type: String,
        default: 'csvue'
      },
      separator: {
        type: String,
        default: ',',
        validate: (sep) => {
          return [';', ',', ' '].indexOf(sep) > -1;
        }
      }
    },
    methods: {
      onDownloadBtnClicked(event) {
        event.preventDefault();
        this.isDownloading = true;
        this.downloadData = this.data.slice(0);
        this.downloadExcel();
      },
      downloadExcel() {
        const csvData = getHeaderRow(this.columns, this.separator) + getBodyXML(this.downloadData, this.columns, this.separator);
        const mimeType = 'text/csv;encoding:utf-8';
        const fileName = `${this.fileName}.csv`;
        const anchor = document.createElement('a');

        if (navigator.msSaveBlob) { // IE10
          navigator.msSaveBlob(new Blob([csvData], {
            type: mimeType
          }), fileName);
        } else if (URL && 'download' in anchor) { //html5 A[download]
          anchor.href = URL.createObjectURL(new Blob([csvData], {
            type: mimeType
          }));
          anchor.setAttribute('download', fileName);
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        } else {
          // only this mime type is supported
          location.href = 'data:application/octet-stream,${encodeURIComponent(csvData)}';
        }

        this.$emit('complete');
      }
    }
  };
</script>
