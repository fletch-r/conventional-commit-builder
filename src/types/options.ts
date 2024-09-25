type Scopes = string[];
type ReferenceRegex = string;
type Template = string;
type NewLine = string;
type EmojiFilter = string;
type ShowCommit = boolean;
type AutoCommit = boolean;
type DisableEmoji = boolean;
type DisableReference = boolean;
type DisableBody = boolean;
type DisableFooter = boolean;
type CustomTypes = Array<{ label: string; description: string; detail: string; }>;

export type Options = {
  scopes: Scopes;
  referenceRegex: ReferenceRegex;
  template: Template;
  newLine: NewLine;
  emojiFilter: EmojiFilter;
  showCommit: ShowCommit;
  autoCommit: AutoCommit;
  disableEmoji: DisableEmoji;
  disableReference: DisableReference;
  disableBody: DisableBody;
  disableFooter: DisableFooter;
  customTypes: CustomTypes;
};