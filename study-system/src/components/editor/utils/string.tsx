export default function ReplaceClass(s: string) {
  s.replace(`class="ql-size-12"`, `style={{fontSize: "12px"}}`);
  s.replace(`class="ql-size-14"`, `style={{fontSize: "14px"}}`);
  s.replace(`class="ql-size-16"`, `style={{fontSize: "16px"}}`);
  s.replace(`class="ql-size-18"`, `style={{fontSize: "18px"}}`);
  s.replace(`class="ql-size-30"`, `style={{fontSize: "30px"}}`);

  return s;
}
