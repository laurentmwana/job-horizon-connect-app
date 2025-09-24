<?php

namespace App\Http\Controllers\Faq;

use App\Services\FaqService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\FaqRequest;
use App\Http\Controllers\Controller;

class AdminFaqController extends Controller
{
    /**
     * @param \App\Services\FaqService $faqService
     */
    public function __construct(private FaqService $faqService)
    {
    }

    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        $faqs = $this->faqService->findPaginatedAndFiltered();

        return Inertia::render('admin/faq/index', [
            'faqs' => $faqs,
        ]);
    }


    /**
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('admin/faq/create');
    }


    /**
     * @param \App\Http\Requests\FaqRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(FaqRequest $request)
    {
        $this->faqService->create($request->toDto());

        return redirect()->route('admin.faq.index')
            ->with('success', 'quiz créé');
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function show(string $id)
    {
        $faq = $this->faqService->findById($id);

        return Inertia::render('admin/faq/show', [
            'faq' => $faq,
        ]);
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function edit(string $id)
    {
        $faq = $this->faqService->findById($id);

        return Inertia::render('admin/faq/edit', [
            'faq' => $faq,
        ]);
    }

    /**
     * @param \App\Http\Requests\FaqRequest $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(FaqRequest $request, string $id)
    {
        $faq = $this->faqService->findById($id);

        $this->faqService->update($faq, $request->toDto());

        return redirect()->route('admin.faq.index')
            ->with('success', 'quiz editié');
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

        $faq = $this->faqService->findById($id);

        $this->faqService->delete($faq);

        return redirect()->route('admin.faq.index')
            ->with('success', 'quiz supprimé');
    }
}
