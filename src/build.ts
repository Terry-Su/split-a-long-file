import { Rule } from "./__typings__/index.spec"
import * as FS from "fs-extra"
import * as PATH from "path"

function matchText( start: string, end: string, sourceText: string ) {
  let res = ''

  try {
    const startIndex = sourceText.indexOf( start )
    const endIndex = sourceText.indexOf( end ) + end.length
    res = sourceText.substring( startIndex, endIndex )
  } finally {

  }

  return res
}

export default function( input: string, outputDir: string, rules: Rule[] ) {
  const sourceText = FS.readFileSync( input, { encoding: "utf8" } )
  function resolveRule( rule: Rule ) {
    const { start, end, file, before = '', after = '' } = rule
    const matchedText = matchText( start, end, sourceText )
    const outputingText = `${ before }${ matchedText }${ after }`

    const outputPath = PATH.resolve( outputDir, file )
    FS.outputFileSync( outputPath, outputingText )
  }

  const filteredRules = rules.filter( rule => rule.file != null && rule.file.length > 0 )
  filteredRules.forEach( resolveRule )
}
