# Test fixture: writes CLAUDE.md in a temp folder.
def test_writes(tmp_path):
    (tmp_path / "CLAUDE.md").write_text("x")
