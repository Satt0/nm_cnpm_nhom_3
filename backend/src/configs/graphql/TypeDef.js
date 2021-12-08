const { gql } = require("apollo-server-express");

const NhanKhauTypeDef = require("../../models/person/TypeDefs");
const UserTypeDef = require("../../models/user/TypeDef");
const HoKhauTypeDef = require("../../models/family/TypeDefs");
const defaultTypeDef = gql`
  type Query {
    test: String!
  }
  type Mutation {
    test: String!
  }
`;

module.exports = [
  defaultTypeDef /* other TypeDefs placed after this.*/,
  NhanKhauTypeDef,
  UserTypeDef,
  HoKhauTypeDef,
];
