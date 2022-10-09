import React from "react"

const ExportToExcel = () => {
  return <div></div>
}

export default ExportToExcel

// export function tableToPDF(id, code, fileName = "PDF", title) {
//   const sTable = document.getElementById(id).innerHTML

//   const listName = EXPORT_FILE_NAME
//   let newStr = ""
//   let titleText = ""
//   if (listName[id]) fileName = listName[id]

//   if (typeof code === "number") {
//     newStr = `THÁNG ${code}`
//     titleText = `${fileName} - ${newStr}`
//   } else {
//     try {
//       const allModules = JSON.parse(localStorage.getItem("allModules")) || null
//       if (allModules[code] && allModules[code].title) {
//         fileName = allModules[code].title
//       }
//     } catch (e) {
//       console.log("e", e)
//     }
//     if (getCurrentUrl() === "inComingDocument") {
//       fileName = "Công văn đến"
//     }
//     if (getCurrentUrl() === "OrderPo") {
//       fileName = "Hóa đơn mua hàng"
//     }
//     if (getCurrentUrl() === "outGoingDocument") {
//       fileName = "Công văn đi"
//     }
//     titleText = fileName
//   }

//   const style = `<style>
//       table {
//           font-family: arial, sans-serif;
//           border-collapse: collapse;
//           width: 100%;
//       }

//       td,
//       th {
//         word-wrap: break-word;
//         max-width: 100px;
//         min-width: 40px;
//         border: 1px solid #dddddd;
//         min-height: 100px;
//         padding: 8px;
//     }

//   </style>`

//   // CREATE A WINDOW OBJECT.
//   // var win = window.open('', '', 'height=700,width=700');
//   // var win = window.open(`${pageNumber}`);
//   const fileTitle = title ? title : `${titleText}`
//   console.log(title, "title")
//   const title1 = "Danh sách khách hàng"
//   let html = "<!DOCTYPE html><html><head>"
//   html += `<title>${fileTitle}</title>`
//   html += style
//   html += "</head>"
//   html += "<body>"
//   html += `<h2 style="text-align: center">${fileTitle === "Khách hàng" ? title1 : fileTitle}</h2>`
//   html += sTable
//   html += "</body></html>"

//   const removeContext = "tfoot"
//   if (html.includes(removeContext)) {
//     const start = html.indexOf(`<${removeContext}>`)
//     const end = html.indexOf(`</${removeContext}>`)
//     html = `${html.substr(0, start)}${html.substr(end + removeContext.length + 3)}`
//   }

//   return html
// }

export function tableToExcel(id, n, code, fileName = "download", title) {
  // console.log(id)
  const listName = EXPORT_FILE_NAME
  if (listName[id]) fileName = listName[id]
  try {
    const allModules = JSON.parse(localStorage.getItem("allModules")) || null
    if (allModules[code] && allModules[code].title) {
      fileName = allModules[code].title
    }
  } catch (e) {
    console.log("e", e)
  }
  if (getCurrentUrl() === "inComingDocument") {
    fileName = "Công văn đến"
  }
  if (getCurrentUrl() === "outGoingDocument") {
    fileName = "Công văn đi"
  }
  if (title) {
    fileName = title
  }
  const uri = "data:application/vnd.ms-excel;base64,"
  const template = `<html 
    xmlns:o="urn:schemas-microsoft-com:office:office" 
    xmlns:x="urn:schemas-microsoft-com:office:excel" 
    xmlns="http://www.w3.org/TR/REC-html40">
    <head>
    <!--[if gte mso 9]>
    <xml>
    <x:ExcelWorkbook>
    <x:ExcelWorksheets>
    <x:ExcelWorksheet>
    <x:Name>{worksheet}</x:Name>
    <x:WorksheetOptions>
    <x:DisplayGridlines/>
    </x:WorksheetOptions>
    </x:ExcelWorksheet>
    </x:ExcelWorksheets>
    </x:ExcelWorkbook></xml>
    <![endif]-->
    <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
    </head><body>
        ${
          fileName.trim() && fileName !== "download"
            ? `<table>
          <body>
            <tr rowspan='1'>
              <td></td>
              <td></td>
              <td colspan='5'><h3>${fileName}<h3></td>
            </tr>
          </body>
        </table><br/>`
            : ""
        }
        {table}
    </body></html>`

  function base64(s) {
    return window.btoa(unescape(encodeURIComponent(s)))
  }

  function format(s, c) {
    return s.replace(/{(\w+)}/g, (m, p) => c[p])
  }

  function getHtml(table) {
    if (!table.nodeType) table = document.getElementById(table)
    table = table.innerHTML
    table = table.split("<tfoot>")
    // table[0] = table[0].replaceAll('<td>', '<td>="')
    // table[0] = table[0].replaceAll('</td>', '"</td>')
    table = table.join("<tfoot>")
    return table
  }

  function print(table, name) {
    table = getHtml(table)
    const ctx = { worksheet: name || "Worksheet", table }
    // window.location.href = uri + base64(format(template, ctx));
    const a = document.createElement("a")
    a.href = uri + base64(format(template, ctx))
    a.download = `${fileName}.xls`
    a.click()
  }
  print(id, n)
}
