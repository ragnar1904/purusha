import { reducer } from "../hosts";
import { HostStrings, HostsAction } from "../../types/Hosts";

describe("test HostStrings reducer", () => {
  describe("ADD", () => {
    it("add item", () => {
      const initialState: HostStrings = [];
      const action: HostsAction = {
        type: "ADD",
        value: "https://hogehoge.com",
      };
      const actual = reducer(initialState, action);
      expect(actual).toEqual(["https://hogehoge.com"]);
    });
  });
  describe("EDIT", () => {
    it("edit item", () => {
      const initialState: HostStrings = [
        "https://hogehoge.com",
        "http://hogehoge.com",
      ];
      const action: HostsAction = {
        type: "EDIT",
        value: "https://hogehoge.co",
        index: 0,
      };
      const actual = reducer(initialState, action);
      expect(actual).toEqual(["https://hogehoge.co", "http://hogehoge.com"]);
    });
  });
  describe("DELETE", () => {
    it("delete item", () => {
      const initialState: HostStrings = ["https://hogehoge.com"];
      const action: HostsAction = {
        type: "DELETE",
        index: 0,
      };
      const actual = reducer(initialState, action);
      expect(actual).toEqual([]);
    });
    it("delete item from multiple array", () => {
      const initialState: HostStrings = [
        "https://hogehoge.com",
        "http://hoge.com",
        "https://foo.inc",
      ];
      const action: HostsAction = {
        type: "DELETE",
        index: 1,
      };
      const actual = reducer(initialState, action);
      expect(actual).toEqual(["https://hogehoge.com", "https://foo.inc"]);
    });
    it("if recieved non index value, returns initialState", () => {
      const initialState: HostStrings = [
        "https://hogehoge.com",
        "http://hoge.com",
        "https://foo.inc",
      ];
      const action: HostsAction = {
        type: "DELETE",
        index: 3,
      };
      const actual = reducer(initialState, action);
      expect(actual).toEqual(initialState);
    });
  });
  describe("LOAD", () => {
    it("load HostStrings", () => {
      const initialState: HostStrings = [];
      const action: HostsAction = {
        type: "LOAD",
        hosts: ["https://hogehoge.com", "http://hoge.com", "https://foo.inc"],
      };
      const actual = reducer(initialState, action);
      expect(actual).toEqual([
        "https://hogehoge.com",
        "http://hoge.com",
        "https://foo.inc",
      ]);
    });
  });
  describe("invalid action", () => {
    it("throw error", () => {
      const initialState: HostStrings = [];
      const action = {
        type: "AAA",
      } as unknown as HostsAction;
      expect(() => reducer(initialState, action)).toThrowError();
    });
  });
});
