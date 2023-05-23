import React from 'react'
import { Button } from '../../Global'
import ClipLoader  from 'react-spinners/ClipLoader'

function MyButton(props) {
  return (
    <Button {...props}>
      {props.label}
      {props.isloading && (
          <ClipLoader
            color={"#fff"}
            loading={props.isloading}
            size={15}
            cssOverride={{ marginLeft: "0.5rem" }}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
    </Button>
  )
}

export default MyButton