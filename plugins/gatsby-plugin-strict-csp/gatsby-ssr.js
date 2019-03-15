const React = require('react')
const crypto = require('crypto')

function computeHash(string) {
  const hash = crypto
    .createHash('sha256')
    .update(string)
    .digest('base64')
  return "'sha256-" + hash + "'"
}

exports.onPreRenderHTML = (
  { getHeadComponents, replaceHeadComponents, getPostBodyComponents },
  userPluginOptions
) => {
  // early return if not production
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  let headComponents = getHeadComponents()
  let postBodyComponents = getPostBodyComponents()

  let components = [...headComponents, ...postBodyComponents]
  let scriptHashes = ''

  React.Children.map(components, child => {
    if (child.type === 'script' && child.props && child.props.dangerouslySetInnerHTML) {
      const computedHash = computeHash(child.props.dangerouslySetInnerHTML.__html)
      scriptHashes += ` ${computedHash}`
    }
  })

  let CSP = `base-uri 'none'; default-src 'none'; script-src https://www.google-analytics.com 'self'${scriptHashes}; style-src 'self' 'unsafe-inline'; object-src 'none'; form-action 'self'; font-src self data:; connect-src 'self'; img-src 'self' https://www.google-analytics.com data:; frame-ancestors 'none'`

  const CSPcomponent = React.createElement('meta', {
    httpEquiv: 'Content-Security-Policy',
    content: CSP
  })

  headComponents.unshift(CSPcomponent)
  replaceHeadComponents(headComponents)
}
