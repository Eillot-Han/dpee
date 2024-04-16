import { getFileFromUrl } from './transferFile'
import { useOssUpload } from './upload'

export const editor_change = (content: string) => {
  return content
    .replace(/img style="width: 100%;height:auto;/g, `img"`)
    .replace(/img/g, `img style="width: 100%;height:auto;"`)
    .replace(/class="ql-indent-1"/g, `style="text-indent: 2em;"`)
    .replace(/class="ql-indent-2"/g, `style="text-indent: 4em;"`)
    .replace(/class="ql-indent-3"/g, `style="text-indent: 6em;"`)
    .replace(/class="ql-indent-4"/g, `style="text-indent: 8em;"`)
    .replace(/class="ql-align-center"/g, `style="text-align: center;"`)
    .replace(
      /class="ql-indent-1 ql-align-center"/g,
      `style="text-indent: 2em; text-align: center;"`,
    )
    .replace(
      /class="ql-indent-2 ql-align-center"/g,
      `style="text-indent: 4em; text-align: center;"`,
    )
    .replace(
      /class="ql-indent-3 ql-align-center"/g,
      `style="text-indent: 6em; text-align: center;"`,
    )
    .replace(
      /class="ql-indent-4 ql-align-center"/g,
      `style="text-indent: 8em; text-align: center;"`,
    )
    .replace(
      /class="ql-align-center ql-indent-1"/g,
      `style="text-indent: 2em; text-align: center;"`,
    )
    .replace(
      /class="ql-align-center ql-indent-2"/g,
      `style="text-indent: 4em; text-align: center;"`,
    )
    .replace(
      /class="ql-align-center ql-indent-3"/g,
      `style="text-indent: 6em; text-align: center;"`,
    )
    .replace(
      /class="ql-align-center ql-indent-4"/g,
      `style="text-indent: 8em; text-align: center;"`,
    )
}

export const useUrlChange = () => {
  const [UploadOneByOne_OSS] = useOssUpload()
  const url_change = async (content: string) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /(http|https):\/\/[^\.]+\.xiumi\.us\/[^\.]+\.(png|gif|jpg|jpeg|bmp)/gi
    let edited_content = content
    // eslint-disable-next-line no-useless-escape
    const insertData = edited_content.replace(/(\?x-oss[^\"\'\)\>\&]*)/g, '')
    if (insertData.match(reg) && insertData.match(reg)?.length) {
      const imgs = Array.from(new Set(insertData.match(reg)))
      const Files: File[] = []
      for (let i in imgs) {
        const file = await getFileFromUrl(imgs[i], imgs[i].slice(imgs[i].lastIndexOf('/') + 1))
        Files.push(file)
      }
      const urls = await UploadOneByOne_OSS(Files, 0, Files.length, [], 'xiumi')
      for (let i in imgs) {
        edited_content = edited_content.replaceAll(imgs[i], urls[i])
      }
    }
    // console.log('edited_content======', edited_content)
    return edited_content
  }

  return [url_change]
}
