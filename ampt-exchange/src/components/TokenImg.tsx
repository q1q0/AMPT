import React from 'react'
import styled from 'styled-components'
import unknownTokenImg from 'assets/img/unknown-token.png'

function _loadFallbackTokenImage(event: React.SyntheticEvent<HTMLImageElement>): void {
  const image = event.currentTarget
  image.src = unknownTokenImg
}

interface TokenImgProps {
  faded?: boolean
}

const TokenImg = styled.img.attrs(() => ({ onError: _loadFallbackTokenImage }))<TokenImgProps>`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 3.6rem;
  object-fit: contain;
  margin: 0 1rem 0 0;
  background-color: white;
  padding: 2px;
  opacity: ${(props): number => (props.faded ? 0.4 : 1)};
`

export default TokenImg

export const TokenImgWrapper = styled(TokenImg)`
  width: 2.4rem;
  height: 2.4rem;
  margin: 0 0.5rem 0 0;
`
