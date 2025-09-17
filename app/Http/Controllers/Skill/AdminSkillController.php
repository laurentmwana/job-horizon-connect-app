<?php

namespace App\Http\Controllers\Skill;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\SkillService;
use App\Http\Requests\SkillRequest;
use App\Http\Controllers\Controller;

class AdminSkillController  extends Controller
{
    /**
     * @param \App\Services\SkillService $skillService
     */
    public function __construct(private SkillService $skillService)
    {
    }

    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        $skills = $this->skillService->findPaginatedAndFiltered();

        return Inertia::render('admin/skill/index', [
            'skills' => $skills,
        ]);
    }


    /**
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('admin/skill/create');
    }


    /**
     * @param \App\Http\Requests\SkillRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(SkillRequest $request)
    {
        $this->skillService->create($request->toDto());

        return redirect()->route('admin.skill.index')
            ->with('success', 'compétence créé');
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function show(string $id)
    {
        $skill = $this->skillService->findById($id);

        return Inertia::render('admin/skill/show', [
            'skill' => $skill,
        ]);
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function edit(string $id)
    {
        $skill = $this->skillService->findById($id);

        return Inertia::render('admin/skill/edit', [
            'skill' => $skill,
        ]);
    }

    /**
     * @param \App\Http\Requests\SkillRequest $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(SkillRequest $request, string $id)
    {
        $skill = $this->skillService->findById($id, false);

        $this->skillService->update($skill, $request->toDto());

        return redirect()->route('admin.skill.index')
            ->with('success', 'compétence editié');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, string $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $skill = $this->skillService->findById($id, false);

        $this->skillService->delete($skill);

        return redirect()->route('admin.skill.index')
            ->with('success', 'compétence supprimé');
    }
}
