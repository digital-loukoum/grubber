import "foo"
import 'foo'
'import "bar"' /*
import "bar"
*/ // import "bar"
`import "bar"`
`${import "foo";}`
// `${`import "bar"`}`
// `${/* import "bar" */}`
// `${`zabu ${import "bar";}`}`
