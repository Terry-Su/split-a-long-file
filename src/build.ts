import { Rule } from "./__typings__/index.spec"
import * as FS from "fs-extra"
import * as PATH from "path"
import { MATCH, INSERT } from "./constant/type"

function matchText( start: string, end: string, sourceText: string ) {
  let res = ""

  try {
    const startIndex = sourceText.indexOf( start )

    if ( startIndex === -1 ) {
      throw `${start} wasn't matched!`
    }

    if ( sourceText.indexOf( end ) === -1 ) {
      throw `${end} wasn't matched!`
    }

    const endIndex = sourceText.indexOf( end ) + end.length
    res = sourceText.substring( startIndex, endIndex )
  } finally {
  }

  return res
}

export default function( input: string, outputDir: string, rules: Rule[] ) {
  const sourceText = FS.readFileSync( input, { encoding: "utf8" } )
  function resolveRule( rule: Rule ) {
    const {
      start,
      end,
      file,
      before = "",
      after = "",
      type = MATCH,
      inserted = ""
    } = rule
    let outputingText
    if ( type === MATCH ) {
      const matchedText = matchText( start, end, sourceText )
      outputingText = `${before}${matchedText}${after}`
    }
    if ( type === INSERT ) {
      outputingText = `${before}${inserted}${after}`
    }

    const outputPath = PATH.resolve( outputDir, file )
    FS.outputFileSync( outputPath, outputingText )
  }

  const filteredRules = rules.filter(
    rule => rule.file != null && rule.file.length > 0
  )
  filteredRules.forEach( resolveRule )
}
