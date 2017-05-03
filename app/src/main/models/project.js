'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _minidb = require('minidb');

var _fulcrumCore = require('fulcrum-core');

class Project extends _fulcrumCore.Project {
  static get tableName() {
    return 'projects';
  }

  static get columns() {
    return [{ name: 'accountRowID', column: 'account_id', type: 'integer', null: false }, { name: 'id', column: 'resource_id', type: 'string', null: false }, { name: 'name', column: 'name', type: 'string', null: false }, { name: 'description', column: 'description', type: 'string' }, { name: 'createdAt', column: 'created_at', type: 'datetime', null: false }, { name: 'updatedAt', column: 'updated_at', type: 'datetime', null: false }, { name: 'deletedAt', column: 'deleted_at', type: 'datetime' }];
  }
}

exports.default = Project;
_minidb.PersistentObject.register(Project);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL21vZGVscy9wcm9qZWN0LmpzIl0sIm5hbWVzIjpbIlByb2plY3QiLCJ0YWJsZU5hbWUiLCJjb2x1bW5zIiwibmFtZSIsImNvbHVtbiIsInR5cGUiLCJudWxsIiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQUVlLE1BQU1BLE9BQU4sOEJBQWtDO0FBQy9DLGFBQVdDLFNBQVgsR0FBdUI7QUFDckIsV0FBTyxVQUFQO0FBQ0Q7O0FBRUQsYUFBV0MsT0FBWCxHQUFxQjtBQUNuQixXQUFPLENBQ0wsRUFBRUMsTUFBTSxjQUFSLEVBQXdCQyxRQUFRLFlBQWhDLEVBQThDQyxNQUFNLFNBQXBELEVBQStEQyxNQUFNLEtBQXJFLEVBREssRUFFTCxFQUFFSCxNQUFNLElBQVIsRUFBY0MsUUFBUSxhQUF0QixFQUFxQ0MsTUFBTSxRQUEzQyxFQUFxREMsTUFBTSxLQUEzRCxFQUZLLEVBR0wsRUFBRUgsTUFBTSxNQUFSLEVBQWdCQyxRQUFRLE1BQXhCLEVBQWdDQyxNQUFNLFFBQXRDLEVBQWdEQyxNQUFNLEtBQXRELEVBSEssRUFJTCxFQUFFSCxNQUFNLGFBQVIsRUFBdUJDLFFBQVEsYUFBL0IsRUFBOENDLE1BQU0sUUFBcEQsRUFKSyxFQUtMLEVBQUVGLE1BQU0sV0FBUixFQUFxQkMsUUFBUSxZQUE3QixFQUEyQ0MsTUFBTSxVQUFqRCxFQUE2REMsTUFBTSxLQUFuRSxFQUxLLEVBTUwsRUFBRUgsTUFBTSxXQUFSLEVBQXFCQyxRQUFRLFlBQTdCLEVBQTJDQyxNQUFNLFVBQWpELEVBQTZEQyxNQUFNLEtBQW5FLEVBTkssRUFPTCxFQUFFSCxNQUFNLFdBQVIsRUFBcUJDLFFBQVEsWUFBN0IsRUFBMkNDLE1BQU0sVUFBakQsRUFQSyxDQUFQO0FBU0Q7QUFmOEM7O2tCQUE1QkwsTztBQWtCckIseUJBQWlCTyxRQUFqQixDQUEwQlAsT0FBMUIiLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBlcnNpc3RlbnRPYmplY3QgfSBmcm9tICdtaW5pZGInO1xuaW1wb3J0IHsgUHJvamVjdCBhcyBQcm9qZWN0QmFzZSB9IGZyb20gJ2Z1bGNydW0tY29yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3QgZXh0ZW5kcyBQcm9qZWN0QmFzZSB7XG4gIHN0YXRpYyBnZXQgdGFibGVOYW1lKCkge1xuICAgIHJldHVybiAncHJvamVjdHMnO1xuICB9XG5cbiAgc3RhdGljIGdldCBjb2x1bW5zKCkge1xuICAgIHJldHVybiBbXG4gICAgICB7IG5hbWU6ICdhY2NvdW50Um93SUQnLCBjb2x1bW46ICdhY2NvdW50X2lkJywgdHlwZTogJ2ludGVnZXInLCBudWxsOiBmYWxzZSB9LFxuICAgICAgeyBuYW1lOiAnaWQnLCBjb2x1bW46ICdyZXNvdXJjZV9pZCcsIHR5cGU6ICdzdHJpbmcnLCBudWxsOiBmYWxzZSB9LFxuICAgICAgeyBuYW1lOiAnbmFtZScsIGNvbHVtbjogJ25hbWUnLCB0eXBlOiAnc3RyaW5nJywgbnVsbDogZmFsc2UgfSxcbiAgICAgIHsgbmFtZTogJ2Rlc2NyaXB0aW9uJywgY29sdW1uOiAnZGVzY3JpcHRpb24nLCB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgeyBuYW1lOiAnY3JlYXRlZEF0JywgY29sdW1uOiAnY3JlYXRlZF9hdCcsIHR5cGU6ICdkYXRldGltZScsIG51bGw6IGZhbHNlIH0sXG4gICAgICB7IG5hbWU6ICd1cGRhdGVkQXQnLCBjb2x1bW46ICd1cGRhdGVkX2F0JywgdHlwZTogJ2RhdGV0aW1lJywgbnVsbDogZmFsc2UgfSxcbiAgICAgIHsgbmFtZTogJ2RlbGV0ZWRBdCcsIGNvbHVtbjogJ2RlbGV0ZWRfYXQnLCB0eXBlOiAnZGF0ZXRpbWUnIH1cbiAgICBdO1xuICB9XG59XG5cblBlcnNpc3RlbnRPYmplY3QucmVnaXN0ZXIoUHJvamVjdCk7XG4iXX0=