from pathlib import Path

def write_report(text):
    Path("out").mkdir(exist_ok=True)
    Path("out/report.md").write_text(text)
