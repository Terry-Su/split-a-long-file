import * as FS from 'fs-extra'
import * as PATH from 'path'
import build from '../../build'
import { Rule } from '../../__typings__/index.spec'

const { resolve } = PATH

describe( "Test", () => {
  it( "test", () => {
    const input = resolve( __dirname, 'input/testInput.js' )
    const output = resolve( __dirname, 'output' )
    const INSERT = 2
    const rules: Rule[] = [
      {
        start : `const a = () => console.log( 'a' )`,
        end   : `a()`,
        file  : 'a.html',
        before: `<script>\n`,
        after : `\n</script>`,
      },
      {
        type    : INSERT,
        file    : 'Inserted1.txt',
        inserted: 'Inserted content'
      },
      {
        start: `const b = () => console.log( 'b' )`,
        end  : `b()`,
        file : 'b.js'
      },
    ]

    build( input, output, rules )
  } )
} )