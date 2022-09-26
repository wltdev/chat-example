import React from 'react'

interface Props {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
}

export const CombineContexts = ({ components }: Props) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        )
      }
    },
    ({ children }) => <>{children}</>
  )
}