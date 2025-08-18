<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MstDepartment;
use Illuminate\Http\Request;

class MstDepartmentController extends Controller
{
    public function index()
    {
        return response()->json(MstDepartment::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'department_no'   => 'required|string|max:50|unique:mst_department',
            'department_name' => 'required|string|max:150',
            'descriptions'    => 'nullable|string',
            'header'          => 'nullable|string|max:150',
            'sub_department'  => 'nullable|string|max:150',
        ]);

        $department = MstDepartment::create($validated);

        return response()->json($department, 201);
    }

    public function show($id)
    {
        $department = MstDepartment::findOrFail($id);
        return response()->json($department);
    }

    public function update(Request $request, $id)
    {
        $department = MstDepartment::findOrFail($id);

        $validated = $request->validate([
            'department_no'   => 'required|string|max:50|unique:mst_department,department_no,' . $id,
            'department_name' => 'required|string|max:150',
            'descriptions'    => 'nullable|string',
            'header'          => 'nullable|string|max:150',
            'sub_department'  => 'nullable|string|max:150',
        ]);

        $department->update($validated);

        return response()->json($department);
    }

    public function destroy($id)
    {
        $department = MstDepartment::findOrFail($id);
        $department->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }

}
