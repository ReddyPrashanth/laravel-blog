import DateDisplay from "../shared/DateDisplay";
import Description from "../shared/Description";
import TheContent from "../shared/TheContent";
import TheImage from "../shared/TheImage";
import Title from "../shared/Title";
import TheGist from '../shared/TheGist';
import SubTitle from "../shared/SubTitle";

const PostDetail = ({postDetail}) => {
    const { contents, gist } = postDetail;
    return (
        <div>
            <Title title={postDetail.title}/>
            {postDetail.files?.length > 0 && <TheImage title={postDetail.title} file={postDetail.files[0].name} />}
            <Description description={postDetail.description}/>
            <DateDisplay displaytext="Created On" date={postDetail.created_at} />
            <DateDisplay displaytext="Last Updated" date={postDetail.updated_at} />
            <div className="mt-4">
                {contents.map((c, idx) => <TheContent key={idx} content={c}/>)}
            </div>
            {gist && 
                <div>
                    <SubTitle subTitle="Useful Information"/>
                    <TheGist id={gist}/>
                </div>
            }
        </div>
    )
}

export default PostDetail;