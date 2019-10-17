import React from 'react'
import { Container, Side, Sides } from './elements'

export const Cube = ({
                       size = 150,
                       ...props
                     }) => (
  <Container size={size} {...props}>
    <Sides size={size}>
      <Side rotate="rotateX(90deg)" size={size}/>
      <Side rotate="rotateX(-90deg)" size={size}/>
      <Side rotate="rotateY(0deg)" size={size}/>
      <Side rotate="rotateY(-180deg)" size={size}/>
      <Side rotate="rotateY(-90deg)" size={size}/>
      <Side rotate="rotateY(90deg)" size={size}/>
    </Sides>
  </Container>
)
