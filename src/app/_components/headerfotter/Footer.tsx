"use client";

import React from "react";
import styled from "styled-components";

export const Footer = () => {
  return <SFooter>&copy; fabre, inc.</SFooter>;
};

const SFooter = styled.footer`
  background-color: #2b3d51;
  color: #fff;
  text-align: center;
  padding: 8px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
`;
