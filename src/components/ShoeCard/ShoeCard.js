import React from 'react';
import styled, { css } from 'styled-components/macro';

import {COLORS, LABELS, WEIGHTS} from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
  className,
}) => {
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default';

  return (
    <Link href={`/shoe/${slug}`} className={className}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price $hasSale={Boolean(salePrice)}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
        {variant !== "default" && (<ShoeLabel $variant={variant}>{LABELS[variant]}</ShoeLabel>)}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  position: relative;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  display: block;
  border-radius: 16px 16px 4px 4px;
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  ${({ $hasSale }) => $hasSale && css`
    text-decoration: line-through;
  `};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const ShoeLabel = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 8px 10px;
  border-radius: 2px;
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.white};
  
  ${({ $variant }) => $variant === 'new-release' ? css`
    background-color: ${COLORS.secondary};
  ` : css`
    background-color: ${COLORS.primary};
  `}
`

export default ShoeCard;
