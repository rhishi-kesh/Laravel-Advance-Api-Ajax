@forelse ($comments as $comment)
    <div class="card card-body my-2">
        {{ $comment->comment }}
        <p>
            <span class="badge badge-info">at {{ $comment->created_at->diffForHumans() }} </span>
        </p>
    </div>
    @empty
    <div class="bg-danger text-white text-bold p-3">
        <p class="fs-1 mb-0">No Comment Found</p>
    </div>
@endforelse
