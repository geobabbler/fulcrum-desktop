"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_resource_id TEXT,
  organization_resource_id TEXT,
  organization_name TEXT,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  description TEXT,
  token TEXT,
  last_sync_photos INTEGER,
  last_sync_videos INTEGER,
  last_sync_audio INTEGER,
  last_sync_signatures INTEGER,
  last_sync_changesets INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  deleted_at INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_accounts_user_organization ON accounts (user_resource_id ASC, organization_resource_id ASC);

CREATE TABLE IF NOT EXISTS sync_state (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource TEXT NOT NULL,
  scope TEXT,
  hash TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_sync_state_account_resource_scope ON sync_state (account_id ASC, resource ASC, scope ASC);

CREATE TABLE IF NOT EXISTS records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  form_id INTEGER NOT NULL,
  status TEXT,
  version INTEGER NOT NULL,
  title TEXT,
  form_values TEXT,
  latitude REAL,
  longitude REAL,
  altitude REAL,
  course REAL,
  speed REAL,
  horizontal_accuracy REAL,
  vertical_accuracy REAL,
  client_created_at INTEGER,
  client_updated_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  changeset_id INTEGER,
  changeset_resource_id TEXT,
  project_id INTEGER,
  project_resource_id TEXT,
  assigned_to_id INTEGER,
  assigned_to_resource_id TEXT,
  updated_by_id INTEGER,
  updated_by_resource_id TEXT,
  created_by_id INTEGER,
  created_by_resource_id TEXT,
  draft INTEGER NOT NULL DEFAULT 0,
  has_changes INTEGER NOT NULL DEFAULT 0,
  is_new INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  index_text TEXT,
  created_latitude REAL,
  created_longitude REAL,
  created_altitude REAL,
  created_accuracy REAL,
  updated_latitude REAL,
  updated_longitude REAL,
  updated_altitude REAL,
  updated_accuracy REAL,
  created_duration INTEGER,
  updated_duration INTEGER,
  edited_duration INTEGER
);

CREATE UNIQUE INDEX idx_records_account_resource_id ON records (account_id, resource_id);

CREATE VIRTUAL TABLE records_index USING fts4(content='records', index_text, form_id, prefix="1,2,3");

CREATE TRIGGER records_before_update BEFORE UPDATE ON records BEGIN
  DELETE FROM records_index WHERE docid=old.rowid;
END;

CREATE TRIGGER records_before_delete BEFORE DELETE ON records BEGIN
  DELETE FROM records_index WHERE docid=old.rowid;
END;

CREATE TRIGGER records_after_update AFTER UPDATE ON records BEGIN
  INSERT INTO records_index (docid, index_text, form_id) VALUES (new.rowid, new.index_text, new.form_id);
END;

CREATE TRIGGER records_after_insert AFTER INSERT ON records BEGIN
  INSERT INTO records_index (docid, index_text, form_id) VALUES (new.rowid, new.index_text, new.form_id);
END;

CREATE INDEX IF NOT EXISTS idx_records_account_id ON records (account_id);
CREATE INDEX IF NOT EXISTS idx_records_account_id_remote_id ON records (account_id, resource_id);
CREATE INDEX IF NOT EXISTS idx_records_form_status ON records (form_id, status);
CREATE INDEX IF NOT EXISTS idx_records_form_title ON records (form_id, title);
CREATE INDEX IF NOT EXISTS idx_records_form_client_created_at ON records (form_id, client_created_at);
CREATE INDEX IF NOT EXISTS idx_records_form_client_updated_at ON records (form_id, client_updated_at);
CREATE INDEX IF NOT EXISTS idx_records_form_resource_id ON records (form_id, resource_id);
CREATE INDEX IF NOT EXISTS idx_records_form_latitude_longitude ON records (form_id, latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_records_form_project ON records (form_id, project_id);
CREATE INDEX IF NOT EXISTS idx_records_latitude_longitude ON records (latitude, longitude);

CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  name TEXT,
  is_system INTEGER NOT NULL,
  is_default INTEGER NOT NULL,
  can_manage_subscription INTEGER NOT NULL,
  can_update_organization INTEGER NOT NULL,
  can_manage_members INTEGER NOT NULL,
  can_manage_roles INTEGER NOT NULL,
  can_manage_layers INTEGER NOT NULL,
  can_manage_apps INTEGER NOT NULL,
  can_create_records INTEGER NOT NULL,
  can_update_records INTEGER NOT NULL,
  can_delete_records INTEGER NOT NULL,
  can_manage_projects INTEGER NOT NULL,
  can_manage_choice_lists INTEGER NOT NULL,
  can_manage_classification_sets INTEGER NOT NULL,
  can_change_status INTEGER NOT NULL,
  can_change_project INTEGER NOT NULL,
  can_assign_records INTEGER NOT NULL,
  can_import_records INTEGER NOT NULL,
  can_export_records INTEGER NOT NULL,
  can_run_reports INTEGER NOT NULL,
  can_manage_authorizations INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  deleted_at INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_roles_account_resource_id ON roles (account_id, resource_id);

CREATE TABLE IF NOT EXISTS memberships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  user_resource_id TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  role_id INTEGER NOT NULL,
  role_resource_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  deleted_at INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_memberships_account_user_organization ON memberships (account_id, user_resource_id);

CREATE TABLE IF NOT EXISTS choice_lists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  choices TEXT,
  name TEXT,
  description TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  deleted_at INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_choice_lists_account_resource_id ON choice_lists (account_id, resource_id);

CREATE TABLE IF NOT EXISTS classification_sets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  items TEXT,
  name TEXT,
  description TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  deleted_at INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_classification_sets_account_resource_id ON classification_sets (account_id, resource_id);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  name TEXT,
  description TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  deleted_at INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_account_resource_id ON projects (account_id, resource_id);
CREATE INDEX IF NOT EXISTS idx_projects_account_id_name ON projects (account_id, name);

CREATE TABLE IF NOT EXISTS forms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  name TEXT,
  description TEXT,
  title_field_keys TEXT,
  status_field TEXT,
  elements TEXT,
  last_sync INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  deleted_at INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_forms_account_resource_id ON forms (account_id, resource_id);
CREATE INDEX IF NOT EXISTS idx_forms_account_id ON forms (account_id);
CREATE INDEX IF NOT EXISTS idx_forms_account_id_name ON forms (account_id, name);

CREATE TABLE IF NOT EXISTS photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  file_path TEXT,
  exif TEXT,
  form_id INTEGER,
  record_id INTEGER,
  latitude REAL,
  longitude REAL,
  is_downloaded INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_photos_account_resource_id ON photos (account_id, resource_id);

CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  file_path TEXT,
  metadata TEXT,
  form_id INTEGER,
  record_id INTEGER,
  is_downloaded INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_videos_account_resource_id ON videos (account_id, resource_id);

CREATE TABLE IF NOT EXISTS audio (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  file_path TEXT,
  metadata TEXT,
  form_id INTEGER,
  record_id INTEGER,
  is_downloaded INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_audio_account_resource_id ON audio (account_id, resource_id);

CREATE TABLE IF NOT EXISTS signatures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  file_path TEXT,
  form_id INTEGER,
  record_id INTEGER,
  is_downloaded INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_signatures_account_resource_id ON signatures (account_id, resource_id);

CREATE TABLE IF NOT EXISTS changesets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  resource_id TEXT NOT NULL,
  form_id INTEGER,
  metadata TEXT,
  metadata_index_text TEXT,
  closed_at INTEGER,
  closed_by_id INTEGER,
  closed_by_resource_id TEXT,
  created_by_id INTEGER,
  created_by_resource_id TEXT,
  number_of_changes INTEGER NOT NULL DEFAULT 0,
  min_lat REAL,
  max_lat REAL,
  min_lon REAL,
  max_lon REAL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_changesets_account_resource_id ON changesets (account_id, resource_id);

CREATE VIRTUAL TABLE changesets_index USING fts4(content='changesets', metadata_index_text, form_id, prefix="1,2,3");

CREATE TRIGGER changesets_before_update BEFORE UPDATE ON changesets BEGIN
  DELETE FROM changesets_index WHERE docid=old.rowid;
END;

CREATE TRIGGER changesets_before_delete BEFORE DELETE ON changesets BEGIN
  DELETE FROM changesets_index WHERE docid=old.rowid;
END;

CREATE TRIGGER changesets_after_update AFTER UPDATE ON changesets BEGIN
  INSERT INTO changesets_index (docid, metadata_index_text, form_id) VALUES (new.rowid, new.metadata_index_text, new.form_id);
END;

CREATE TRIGGER changesets_after_insert AFTER INSERT ON changesets BEGIN
  INSERT INTO changesets_index (docid, metadata_index_text, form_id) VALUES (new.rowid, new.metadata_index_text, new.form_id);
END;
`;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tYWluL2RiL21pZ3JhdGlvbnMvdmVyc2lvbl8wMDEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQWdCIiwiZmlsZSI6InZlcnNpb25fMDAxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgYFxuQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgYWNjb3VudHMgKFxuICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXG4gIHVzZXJfcmVzb3VyY2VfaWQgVEVYVCxcbiAgb3JnYW5pemF0aW9uX3Jlc291cmNlX2lkIFRFWFQsXG4gIG9yZ2FuaXphdGlvbl9uYW1lIFRFWFQsXG4gIGVtYWlsIFRFWFQsXG4gIGZpcnN0X25hbWUgVEVYVCxcbiAgbGFzdF9uYW1lIFRFWFQsXG4gIGRlc2NyaXB0aW9uIFRFWFQsXG4gIHRva2VuIFRFWFQsXG4gIGxhc3Rfc3luY19waG90b3MgSU5URUdFUixcbiAgbGFzdF9zeW5jX3ZpZGVvcyBJTlRFR0VSLFxuICBsYXN0X3N5bmNfYXVkaW8gSU5URUdFUixcbiAgbGFzdF9zeW5jX3NpZ25hdHVyZXMgSU5URUdFUixcbiAgbGFzdF9zeW5jX2NoYW5nZXNldHMgSU5URUdFUixcbiAgY3JlYXRlZF9hdCBJTlRFR0VSIE5PVCBOVUxMLFxuICB1cGRhdGVkX2F0IElOVEVHRVIgTk9UIE5VTEwsXG4gIGRlbGV0ZWRfYXQgSU5URUdFUlxuKTtcblxuQ1JFQVRFIFVOSVFVRSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF9hY2NvdW50c191c2VyX29yZ2FuaXphdGlvbiBPTiBhY2NvdW50cyAodXNlcl9yZXNvdXJjZV9pZCBBU0MsIG9yZ2FuaXphdGlvbl9yZXNvdXJjZV9pZCBBU0MpO1xuXG5DUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBzeW5jX3N0YXRlIChcbiAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULFxuICBhY2NvdW50X2lkIElOVEVHRVIgTk9UIE5VTEwsXG4gIHJlc291cmNlIFRFWFQgTk9UIE5VTEwsXG4gIHNjb3BlIFRFWFQsXG4gIGhhc2ggVEVYVCxcbiAgY3JlYXRlZF9hdCBJTlRFR0VSIE5PVCBOVUxMLFxuICB1cGRhdGVkX2F0IElOVEVHRVIgTk9UIE5VTExcbik7XG5cbkNSRUFURSBVTklRVUUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfc3luY19zdGF0ZV9hY2NvdW50X3Jlc291cmNlX3Njb3BlIE9OIHN5bmNfc3RhdGUgKGFjY291bnRfaWQgQVNDLCByZXNvdXJjZSBBU0MsIHNjb3BlIEFTQyk7XG5cbkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHJlY29yZHMgKFxuICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXG4gIGFjY291bnRfaWQgSU5URUdFUiBOT1QgTlVMTCxcbiAgcmVzb3VyY2VfaWQgVEVYVCBOT1QgTlVMTCxcbiAgZm9ybV9pZCBJTlRFR0VSIE5PVCBOVUxMLFxuICBzdGF0dXMgVEVYVCxcbiAgdmVyc2lvbiBJTlRFR0VSIE5PVCBOVUxMLFxuICB0aXRsZSBURVhULFxuICBmb3JtX3ZhbHVlcyBURVhULFxuICBsYXRpdHVkZSBSRUFMLFxuICBsb25naXR1ZGUgUkVBTCxcbiAgYWx0aXR1ZGUgUkVBTCxcbiAgY291cnNlIFJFQUwsXG4gIHNwZWVkIFJFQUwsXG4gIGhvcml6b250YWxfYWNjdXJhY3kgUkVBTCxcbiAgdmVydGljYWxfYWNjdXJhY3kgUkVBTCxcbiAgY2xpZW50X2NyZWF0ZWRfYXQgSU5URUdFUixcbiAgY2xpZW50X3VwZGF0ZWRfYXQgSU5URUdFUixcbiAgY3JlYXRlZF9hdCBJTlRFR0VSIE5PVCBOVUxMLFxuICB1cGRhdGVkX2F0IElOVEVHRVIgTk9UIE5VTEwsXG4gIGNoYW5nZXNldF9pZCBJTlRFR0VSLFxuICBjaGFuZ2VzZXRfcmVzb3VyY2VfaWQgVEVYVCxcbiAgcHJvamVjdF9pZCBJTlRFR0VSLFxuICBwcm9qZWN0X3Jlc291cmNlX2lkIFRFWFQsXG4gIGFzc2lnbmVkX3RvX2lkIElOVEVHRVIsXG4gIGFzc2lnbmVkX3RvX3Jlc291cmNlX2lkIFRFWFQsXG4gIHVwZGF0ZWRfYnlfaWQgSU5URUdFUixcbiAgdXBkYXRlZF9ieV9yZXNvdXJjZV9pZCBURVhULFxuICBjcmVhdGVkX2J5X2lkIElOVEVHRVIsXG4gIGNyZWF0ZWRfYnlfcmVzb3VyY2VfaWQgVEVYVCxcbiAgZHJhZnQgSU5URUdFUiBOT1QgTlVMTCBERUZBVUxUIDAsXG4gIGhhc19jaGFuZ2VzIElOVEVHRVIgTk9UIE5VTEwgREVGQVVMVCAwLFxuICBpc19uZXcgSU5URUdFUiBOT1QgTlVMTCBERUZBVUxUIDAsXG4gIGxhc3RfZXJyb3IgVEVYVCxcbiAgaW5kZXhfdGV4dCBURVhULFxuICBjcmVhdGVkX2xhdGl0dWRlIFJFQUwsXG4gIGNyZWF0ZWRfbG9uZ2l0dWRlIFJFQUwsXG4gIGNyZWF0ZWRfYWx0aXR1ZGUgUkVBTCxcbiAgY3JlYXRlZF9hY2N1cmFjeSBSRUFMLFxuICB1cGRhdGVkX2xhdGl0dWRlIFJFQUwsXG4gIHVwZGF0ZWRfbG9uZ2l0dWRlIFJFQUwsXG4gIHVwZGF0ZWRfYWx0aXR1ZGUgUkVBTCxcbiAgdXBkYXRlZF9hY2N1cmFjeSBSRUFMLFxuICBjcmVhdGVkX2R1cmF0aW9uIElOVEVHRVIsXG4gIHVwZGF0ZWRfZHVyYXRpb24gSU5URUdFUixcbiAgZWRpdGVkX2R1cmF0aW9uIElOVEVHRVJcbik7XG5cbkNSRUFURSBVTklRVUUgSU5ERVggaWR4X3JlY29yZHNfYWNjb3VudF9yZXNvdXJjZV9pZCBPTiByZWNvcmRzIChhY2NvdW50X2lkLCByZXNvdXJjZV9pZCk7XG5cbkNSRUFURSBWSVJUVUFMIFRBQkxFIHJlY29yZHNfaW5kZXggVVNJTkcgZnRzNChjb250ZW50PSdyZWNvcmRzJywgaW5kZXhfdGV4dCwgZm9ybV9pZCwgcHJlZml4PVwiMSwyLDNcIik7XG5cbkNSRUFURSBUUklHR0VSIHJlY29yZHNfYmVmb3JlX3VwZGF0ZSBCRUZPUkUgVVBEQVRFIE9OIHJlY29yZHMgQkVHSU5cbiAgREVMRVRFIEZST00gcmVjb3Jkc19pbmRleCBXSEVSRSBkb2NpZD1vbGQucm93aWQ7XG5FTkQ7XG5cbkNSRUFURSBUUklHR0VSIHJlY29yZHNfYmVmb3JlX2RlbGV0ZSBCRUZPUkUgREVMRVRFIE9OIHJlY29yZHMgQkVHSU5cbiAgREVMRVRFIEZST00gcmVjb3Jkc19pbmRleCBXSEVSRSBkb2NpZD1vbGQucm93aWQ7XG5FTkQ7XG5cbkNSRUFURSBUUklHR0VSIHJlY29yZHNfYWZ0ZXJfdXBkYXRlIEFGVEVSIFVQREFURSBPTiByZWNvcmRzIEJFR0lOXG4gIElOU0VSVCBJTlRPIHJlY29yZHNfaW5kZXggKGRvY2lkLCBpbmRleF90ZXh0LCBmb3JtX2lkKSBWQUxVRVMgKG5ldy5yb3dpZCwgbmV3LmluZGV4X3RleHQsIG5ldy5mb3JtX2lkKTtcbkVORDtcblxuQ1JFQVRFIFRSSUdHRVIgcmVjb3Jkc19hZnRlcl9pbnNlcnQgQUZURVIgSU5TRVJUIE9OIHJlY29yZHMgQkVHSU5cbiAgSU5TRVJUIElOVE8gcmVjb3Jkc19pbmRleCAoZG9jaWQsIGluZGV4X3RleHQsIGZvcm1faWQpIFZBTFVFUyAobmV3LnJvd2lkLCBuZXcuaW5kZXhfdGV4dCwgbmV3LmZvcm1faWQpO1xuRU5EO1xuXG5DUkVBVEUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfcmVjb3Jkc19hY2NvdW50X2lkIE9OIHJlY29yZHMgKGFjY291bnRfaWQpO1xuQ1JFQVRFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X3JlY29yZHNfYWNjb3VudF9pZF9yZW1vdGVfaWQgT04gcmVjb3JkcyAoYWNjb3VudF9pZCwgcmVzb3VyY2VfaWQpO1xuQ1JFQVRFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X3JlY29yZHNfZm9ybV9zdGF0dXMgT04gcmVjb3JkcyAoZm9ybV9pZCwgc3RhdHVzKTtcbkNSRUFURSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF9yZWNvcmRzX2Zvcm1fdGl0bGUgT04gcmVjb3JkcyAoZm9ybV9pZCwgdGl0bGUpO1xuQ1JFQVRFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X3JlY29yZHNfZm9ybV9jbGllbnRfY3JlYXRlZF9hdCBPTiByZWNvcmRzIChmb3JtX2lkLCBjbGllbnRfY3JlYXRlZF9hdCk7XG5DUkVBVEUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfcmVjb3Jkc19mb3JtX2NsaWVudF91cGRhdGVkX2F0IE9OIHJlY29yZHMgKGZvcm1faWQsIGNsaWVudF91cGRhdGVkX2F0KTtcbkNSRUFURSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF9yZWNvcmRzX2Zvcm1fcmVzb3VyY2VfaWQgT04gcmVjb3JkcyAoZm9ybV9pZCwgcmVzb3VyY2VfaWQpO1xuQ1JFQVRFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X3JlY29yZHNfZm9ybV9sYXRpdHVkZV9sb25naXR1ZGUgT04gcmVjb3JkcyAoZm9ybV9pZCwgbGF0aXR1ZGUsIGxvbmdpdHVkZSk7XG5DUkVBVEUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfcmVjb3Jkc19mb3JtX3Byb2plY3QgT04gcmVjb3JkcyAoZm9ybV9pZCwgcHJvamVjdF9pZCk7XG5DUkVBVEUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfcmVjb3Jkc19sYXRpdHVkZV9sb25naXR1ZGUgT04gcmVjb3JkcyAobGF0aXR1ZGUsIGxvbmdpdHVkZSk7XG5cbkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHJvbGVzIChcbiAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULFxuICBhY2NvdW50X2lkIElOVEVHRVIgTk9UIE5VTEwsXG4gIHJlc291cmNlX2lkIFRFWFQgTk9UIE5VTEwsXG4gIG5hbWUgVEVYVCxcbiAgaXNfc3lzdGVtIElOVEVHRVIgTk9UIE5VTEwsXG4gIGlzX2RlZmF1bHQgSU5URUdFUiBOT1QgTlVMTCxcbiAgY2FuX21hbmFnZV9zdWJzY3JpcHRpb24gSU5URUdFUiBOT1QgTlVMTCxcbiAgY2FuX3VwZGF0ZV9vcmdhbml6YXRpb24gSU5URUdFUiBOT1QgTlVMTCxcbiAgY2FuX21hbmFnZV9tZW1iZXJzIElOVEVHRVIgTk9UIE5VTEwsXG4gIGNhbl9tYW5hZ2Vfcm9sZXMgSU5URUdFUiBOT1QgTlVMTCxcbiAgY2FuX21hbmFnZV9sYXllcnMgSU5URUdFUiBOT1QgTlVMTCxcbiAgY2FuX21hbmFnZV9hcHBzIElOVEVHRVIgTk9UIE5VTEwsXG4gIGNhbl9jcmVhdGVfcmVjb3JkcyBJTlRFR0VSIE5PVCBOVUxMLFxuICBjYW5fdXBkYXRlX3JlY29yZHMgSU5URUdFUiBOT1QgTlVMTCxcbiAgY2FuX2RlbGV0ZV9yZWNvcmRzIElOVEVHRVIgTk9UIE5VTEwsXG4gIGNhbl9tYW5hZ2VfcHJvamVjdHMgSU5URUdFUiBOT1QgTlVMTCxcbiAgY2FuX21hbmFnZV9jaG9pY2VfbGlzdHMgSU5URUdFUiBOT1QgTlVMTCxcbiAgY2FuX21hbmFnZV9jbGFzc2lmaWNhdGlvbl9zZXRzIElOVEVHRVIgTk9UIE5VTEwsXG4gIGNhbl9jaGFuZ2Vfc3RhdHVzIElOVEVHRVIgTk9UIE5VTEwsXG4gIGNhbl9jaGFuZ2VfcHJvamVjdCBJTlRFR0VSIE5PVCBOVUxMLFxuICBjYW5fYXNzaWduX3JlY29yZHMgSU5URUdFUiBOT1QgTlVMTCxcbiAgY2FuX2ltcG9ydF9yZWNvcmRzIElOVEVHRVIgTk9UIE5VTEwsXG4gIGNhbl9leHBvcnRfcmVjb3JkcyBJTlRFR0VSIE5PVCBOVUxMLFxuICBjYW5fcnVuX3JlcG9ydHMgSU5URUdFUiBOT1QgTlVMTCxcbiAgY2FuX21hbmFnZV9hdXRob3JpemF0aW9ucyBJTlRFR0VSIE5PVCBOVUxMLFxuICBjcmVhdGVkX2F0IElOVEVHRVIgTk9UIE5VTEwsXG4gIHVwZGF0ZWRfYXQgSU5URUdFUiBOT1QgTlVMTCxcbiAgZGVsZXRlZF9hdCBJTlRFR0VSXG4pO1xuXG5DUkVBVEUgVU5JUVVFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X3JvbGVzX2FjY291bnRfcmVzb3VyY2VfaWQgT04gcm9sZXMgKGFjY291bnRfaWQsIHJlc291cmNlX2lkKTtcblxuQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgbWVtYmVyc2hpcHMgKFxuICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXG4gIGFjY291bnRfaWQgSU5URUdFUiBOT1QgTlVMTCxcbiAgcmVzb3VyY2VfaWQgVEVYVCBOT1QgTlVMTCxcbiAgdXNlcl9yZXNvdXJjZV9pZCBURVhUIE5PVCBOVUxMLFxuICBmaXJzdF9uYW1lIFRFWFQsXG4gIGxhc3RfbmFtZSBURVhULFxuICBlbWFpbCBURVhUIE5PVCBOVUxMLFxuICByb2xlX2lkIElOVEVHRVIgTk9UIE5VTEwsXG4gIHJvbGVfcmVzb3VyY2VfaWQgVEVYVCBOT1QgTlVMTCxcbiAgY3JlYXRlZF9hdCBJTlRFR0VSIE5PVCBOVUxMLFxuICB1cGRhdGVkX2F0IElOVEVHRVIgTk9UIE5VTEwsXG4gIGRlbGV0ZWRfYXQgSU5URUdFUlxuKTtcblxuQ1JFQVRFIFVOSVFVRSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF9tZW1iZXJzaGlwc19hY2NvdW50X3VzZXJfb3JnYW5pemF0aW9uIE9OIG1lbWJlcnNoaXBzIChhY2NvdW50X2lkLCB1c2VyX3Jlc291cmNlX2lkKTtcblxuQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgY2hvaWNlX2xpc3RzIChcbiAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULFxuICBhY2NvdW50X2lkIElOVEVHRVIgTk9UIE5VTEwsXG4gIHJlc291cmNlX2lkIFRFWFQgTk9UIE5VTEwsXG4gIGNob2ljZXMgVEVYVCxcbiAgbmFtZSBURVhULFxuICBkZXNjcmlwdGlvbiBURVhULFxuICBjcmVhdGVkX2F0IElOVEVHRVIgTk9UIE5VTEwsXG4gIHVwZGF0ZWRfYXQgSU5URUdFUiBOT1QgTlVMTCxcbiAgZGVsZXRlZF9hdCBJTlRFR0VSXG4pO1xuXG5DUkVBVEUgVU5JUVVFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X2Nob2ljZV9saXN0c19hY2NvdW50X3Jlc291cmNlX2lkIE9OIGNob2ljZV9saXN0cyAoYWNjb3VudF9pZCwgcmVzb3VyY2VfaWQpO1xuXG5DUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBjbGFzc2lmaWNhdGlvbl9zZXRzIChcbiAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULFxuICBhY2NvdW50X2lkIElOVEVHRVIgTk9UIE5VTEwsXG4gIHJlc291cmNlX2lkIFRFWFQgTk9UIE5VTEwsXG4gIGl0ZW1zIFRFWFQsXG4gIG5hbWUgVEVYVCxcbiAgZGVzY3JpcHRpb24gVEVYVCxcbiAgY3JlYXRlZF9hdCBJTlRFR0VSIE5PVCBOVUxMLFxuICB1cGRhdGVkX2F0IElOVEVHRVIgTk9UIE5VTEwsXG4gIGRlbGV0ZWRfYXQgSU5URUdFUlxuKTtcblxuQ1JFQVRFIFVOSVFVRSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF9jbGFzc2lmaWNhdGlvbl9zZXRzX2FjY291bnRfcmVzb3VyY2VfaWQgT04gY2xhc3NpZmljYXRpb25fc2V0cyAoYWNjb3VudF9pZCwgcmVzb3VyY2VfaWQpO1xuXG5DUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBwcm9qZWN0cyAoXG4gIGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcbiAgYWNjb3VudF9pZCBJTlRFR0VSIE5PVCBOVUxMLFxuICByZXNvdXJjZV9pZCBURVhUIE5PVCBOVUxMLFxuICBuYW1lIFRFWFQsXG4gIGRlc2NyaXB0aW9uIFRFWFQsXG4gIGNyZWF0ZWRfYXQgSU5URUdFUiBOT1QgTlVMTCxcbiAgdXBkYXRlZF9hdCBJTlRFR0VSIE5PVCBOVUxMLFxuICBkZWxldGVkX2F0IElOVEVHRVJcbik7XG5cbkNSRUFURSBVTklRVUUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfcHJvamVjdHNfYWNjb3VudF9yZXNvdXJjZV9pZCBPTiBwcm9qZWN0cyAoYWNjb3VudF9pZCwgcmVzb3VyY2VfaWQpO1xuQ1JFQVRFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X3Byb2plY3RzX2FjY291bnRfaWRfbmFtZSBPTiBwcm9qZWN0cyAoYWNjb3VudF9pZCwgbmFtZSk7XG5cbkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIGZvcm1zIChcbiAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULFxuICBhY2NvdW50X2lkIElOVEVHRVIgTk9UIE5VTEwsXG4gIHJlc291cmNlX2lkIFRFWFQgTk9UIE5VTEwsXG4gIHZlcnNpb24gSU5URUdFUiBOT1QgTlVMTCxcbiAgbmFtZSBURVhULFxuICBkZXNjcmlwdGlvbiBURVhULFxuICB0aXRsZV9maWVsZF9rZXlzIFRFWFQsXG4gIHN0YXR1c19maWVsZCBURVhULFxuICBlbGVtZW50cyBURVhULFxuICBsYXN0X3N5bmMgSU5URUdFUixcbiAgY3JlYXRlZF9hdCBJTlRFR0VSIE5PVCBOVUxMLFxuICB1cGRhdGVkX2F0IElOVEVHRVIgTk9UIE5VTEwsXG4gIGRlbGV0ZWRfYXQgSU5URUdFUlxuKTtcblxuQ1JFQVRFIFVOSVFVRSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF9mb3Jtc19hY2NvdW50X3Jlc291cmNlX2lkIE9OIGZvcm1zIChhY2NvdW50X2lkLCByZXNvdXJjZV9pZCk7XG5DUkVBVEUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfZm9ybXNfYWNjb3VudF9pZCBPTiBmb3JtcyAoYWNjb3VudF9pZCk7XG5DUkVBVEUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfZm9ybXNfYWNjb3VudF9pZF9uYW1lIE9OIGZvcm1zIChhY2NvdW50X2lkLCBuYW1lKTtcblxuQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcGhvdG9zIChcbiAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULFxuICBhY2NvdW50X2lkIElOVEVHRVIgTk9UIE5VTEwsXG4gIHJlc291cmNlX2lkIFRFWFQgTk9UIE5VTEwsXG4gIGZpbGVfcGF0aCBURVhULFxuICBleGlmIFRFWFQsXG4gIGZvcm1faWQgSU5URUdFUixcbiAgcmVjb3JkX2lkIElOVEVHRVIsXG4gIGxhdGl0dWRlIFJFQUwsXG4gIGxvbmdpdHVkZSBSRUFMLFxuICBpc19kb3dubG9hZGVkIElOVEVHRVIgTk9UIE5VTEwgREVGQVVMVCAwLFxuICBjcmVhdGVkX2F0IElOVEVHRVIgTk9UIE5VTEwsXG4gIHVwZGF0ZWRfYXQgSU5URUdFUiBOT1QgTlVMTFxuKTtcblxuQ1JFQVRFIFVOSVFVRSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF9waG90b3NfYWNjb3VudF9yZXNvdXJjZV9pZCBPTiBwaG90b3MgKGFjY291bnRfaWQsIHJlc291cmNlX2lkKTtcblxuQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgdmlkZW9zIChcbiAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULFxuICBhY2NvdW50X2lkIElOVEVHRVIgTk9UIE5VTEwsXG4gIHJlc291cmNlX2lkIFRFWFQgTk9UIE5VTEwsXG4gIGZpbGVfcGF0aCBURVhULFxuICBtZXRhZGF0YSBURVhULFxuICBmb3JtX2lkIElOVEVHRVIsXG4gIHJlY29yZF9pZCBJTlRFR0VSLFxuICBpc19kb3dubG9hZGVkIElOVEVHRVIgTk9UIE5VTEwgREVGQVVMVCAwLFxuICBjcmVhdGVkX2F0IElOVEVHRVIgTk9UIE5VTEwsXG4gIHVwZGF0ZWRfYXQgSU5URUdFUiBOT1QgTlVMTFxuKTtcblxuQ1JFQVRFIFVOSVFVRSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF92aWRlb3NfYWNjb3VudF9yZXNvdXJjZV9pZCBPTiB2aWRlb3MgKGFjY291bnRfaWQsIHJlc291cmNlX2lkKTtcblxuQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgYXVkaW8gKFxuICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXG4gIGFjY291bnRfaWQgSU5URUdFUiBOT1QgTlVMTCxcbiAgcmVzb3VyY2VfaWQgVEVYVCBOT1QgTlVMTCxcbiAgZmlsZV9wYXRoIFRFWFQsXG4gIG1ldGFkYXRhIFRFWFQsXG4gIGZvcm1faWQgSU5URUdFUixcbiAgcmVjb3JkX2lkIElOVEVHRVIsXG4gIGlzX2Rvd25sb2FkZWQgSU5URUdFUiBOT1QgTlVMTCBERUZBVUxUIDAsXG4gIGNyZWF0ZWRfYXQgSU5URUdFUiBOT1QgTlVMTCxcbiAgdXBkYXRlZF9hdCBJTlRFR0VSIE5PVCBOVUxMXG4pO1xuXG5DUkVBVEUgVU5JUVVFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X2F1ZGlvX2FjY291bnRfcmVzb3VyY2VfaWQgT04gYXVkaW8gKGFjY291bnRfaWQsIHJlc291cmNlX2lkKTtcblxuQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgc2lnbmF0dXJlcyAoXG4gIGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcbiAgYWNjb3VudF9pZCBJTlRFR0VSIE5PVCBOVUxMLFxuICByZXNvdXJjZV9pZCBURVhUIE5PVCBOVUxMLFxuICBmaWxlX3BhdGggVEVYVCxcbiAgZm9ybV9pZCBJTlRFR0VSLFxuICByZWNvcmRfaWQgSU5URUdFUixcbiAgaXNfZG93bmxvYWRlZCBJTlRFR0VSIE5PVCBOVUxMIERFRkFVTFQgMCxcbiAgY3JlYXRlZF9hdCBJTlRFR0VSIE5PVCBOVUxMLFxuICB1cGRhdGVkX2F0IElOVEVHRVIgTk9UIE5VTExcbik7XG5cbkNSRUFURSBVTklRVUUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfc2lnbmF0dXJlc19hY2NvdW50X3Jlc291cmNlX2lkIE9OIHNpZ25hdHVyZXMgKGFjY291bnRfaWQsIHJlc291cmNlX2lkKTtcblxuQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgY2hhbmdlc2V0cyAoXG4gIGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcbiAgYWNjb3VudF9pZCBJTlRFR0VSIE5PVCBOVUxMLFxuICByZXNvdXJjZV9pZCBURVhUIE5PVCBOVUxMLFxuICBmb3JtX2lkIElOVEVHRVIsXG4gIG1ldGFkYXRhIFRFWFQsXG4gIG1ldGFkYXRhX2luZGV4X3RleHQgVEVYVCxcbiAgY2xvc2VkX2F0IElOVEVHRVIsXG4gIGNsb3NlZF9ieV9pZCBJTlRFR0VSLFxuICBjbG9zZWRfYnlfcmVzb3VyY2VfaWQgVEVYVCxcbiAgY3JlYXRlZF9ieV9pZCBJTlRFR0VSLFxuICBjcmVhdGVkX2J5X3Jlc291cmNlX2lkIFRFWFQsXG4gIG51bWJlcl9vZl9jaGFuZ2VzIElOVEVHRVIgTk9UIE5VTEwgREVGQVVMVCAwLFxuICBtaW5fbGF0IFJFQUwsXG4gIG1heF9sYXQgUkVBTCxcbiAgbWluX2xvbiBSRUFMLFxuICBtYXhfbG9uIFJFQUwsXG4gIGNyZWF0ZWRfYXQgSU5URUdFUiBOT1QgTlVMTCxcbiAgdXBkYXRlZF9hdCBJTlRFR0VSIE5PVCBOVUxMXG4pO1xuXG5DUkVBVEUgVU5JUVVFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X2NoYW5nZXNldHNfYWNjb3VudF9yZXNvdXJjZV9pZCBPTiBjaGFuZ2VzZXRzIChhY2NvdW50X2lkLCByZXNvdXJjZV9pZCk7XG5cbkNSRUFURSBWSVJUVUFMIFRBQkxFIGNoYW5nZXNldHNfaW5kZXggVVNJTkcgZnRzNChjb250ZW50PSdjaGFuZ2VzZXRzJywgbWV0YWRhdGFfaW5kZXhfdGV4dCwgZm9ybV9pZCwgcHJlZml4PVwiMSwyLDNcIik7XG5cbkNSRUFURSBUUklHR0VSIGNoYW5nZXNldHNfYmVmb3JlX3VwZGF0ZSBCRUZPUkUgVVBEQVRFIE9OIGNoYW5nZXNldHMgQkVHSU5cbiAgREVMRVRFIEZST00gY2hhbmdlc2V0c19pbmRleCBXSEVSRSBkb2NpZD1vbGQucm93aWQ7XG5FTkQ7XG5cbkNSRUFURSBUUklHR0VSIGNoYW5nZXNldHNfYmVmb3JlX2RlbGV0ZSBCRUZPUkUgREVMRVRFIE9OIGNoYW5nZXNldHMgQkVHSU5cbiAgREVMRVRFIEZST00gY2hhbmdlc2V0c19pbmRleCBXSEVSRSBkb2NpZD1vbGQucm93aWQ7XG5FTkQ7XG5cbkNSRUFURSBUUklHR0VSIGNoYW5nZXNldHNfYWZ0ZXJfdXBkYXRlIEFGVEVSIFVQREFURSBPTiBjaGFuZ2VzZXRzIEJFR0lOXG4gIElOU0VSVCBJTlRPIGNoYW5nZXNldHNfaW5kZXggKGRvY2lkLCBtZXRhZGF0YV9pbmRleF90ZXh0LCBmb3JtX2lkKSBWQUxVRVMgKG5ldy5yb3dpZCwgbmV3Lm1ldGFkYXRhX2luZGV4X3RleHQsIG5ldy5mb3JtX2lkKTtcbkVORDtcblxuQ1JFQVRFIFRSSUdHRVIgY2hhbmdlc2V0c19hZnRlcl9pbnNlcnQgQUZURVIgSU5TRVJUIE9OIGNoYW5nZXNldHMgQkVHSU5cbiAgSU5TRVJUIElOVE8gY2hhbmdlc2V0c19pbmRleCAoZG9jaWQsIG1ldGFkYXRhX2luZGV4X3RleHQsIGZvcm1faWQpIFZBTFVFUyAobmV3LnJvd2lkLCBuZXcubWV0YWRhdGFfaW5kZXhfdGV4dCwgbmV3LmZvcm1faWQpO1xuRU5EO1xuYDtcbiJdfQ==