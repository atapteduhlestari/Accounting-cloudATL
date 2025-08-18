<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MstProject;
use Illuminate\Http\Request;

class MstProjectController extends Controller
{
    public function index()
    {
        return response()->json(MstProject::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'project_no' => 'required|unique:mst_project,project_no',
            'project_name' => 'required',
        ]);

        $project = MstProject::create($request->all());
        return response()->json($project, 201);
    }

    public function show($id)
    {
        $project = MstProject::findOrFail($id);
        return response()->json($project, 200);
    }

    public function update(Request $request, $id)
    {
        $project = MstProject::findOrFail($id);
        $project->update($request->all());
        return response()->json($project, 200);
    }

    public function destroy($id)
    {
        $project = MstProject::findOrFail($id);
        $project->delete();
        return response()->json(null, 204);
    }
}
