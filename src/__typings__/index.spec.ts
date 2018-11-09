import { MATCH, INSERT } from "../constant/type"

MATCH
type Match = 1
type Insert = 2


enum RuleType {
  MATCH,
  INSERT,
}

export interface Rule {
 type?: RuleType
 start?: string,
 end?: string,
 file: string,
 before?: string,
 after?: string,
 inserted?: string
}