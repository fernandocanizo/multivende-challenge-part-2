import postgres from 'postgres'
// import config from './config.mjs'

// BUG somehow password gets lost and database ends up being "flc"
// instead of "multivende2". Loaded the module in the REPL and it
// happens there too. `console.log(config)` shows correct data.
// Field names are the ones in documentation
// const sql = postgres(config.postgres)

// So I'm hardcoding it in order to continue
const sql = postgres('postgres://flc:flc@localhost:5432/multivende2')

export default sql
